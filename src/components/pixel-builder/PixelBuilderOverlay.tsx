import React, { useEffect, useRef } from 'react';
import {
  CharTarget,
  CompanionEvent,
  usePixelBuilder,
} from './PixelBuilderContext';
import {
  getSpriteFrame,
  SPRITE_COLS,
  SPRITE_ROWS,
  SpriteEye,
  SpritePosture,
} from './sprite';

type Mode = 'idle' | 'building' | 'returning';

interface DocTarget extends CharTarget {
  docX: number;
  docY: number;
}

interface FallingChar {
  idx: number;
  ch: string;
  docX: number;
  docTargetY: number;
  font: string;
  color: string;
  startTime: number;
  duration: number;
}

const IDLE_PHRASES = [
  'Siuuu! ⚽',
  'Foco no código!',
  '100% pixel art!',
  'Bora construir?',
  'CR7 mode ON',
];

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function drawSpeechBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  ctx.save();
  ctx.font = '600 11px ui-sans-serif, system-ui, -apple-system, sans-serif';
  const paddingX = 9;
  const textWidth = ctx.measureText(text).width;
  const boxW = Math.ceil(textWidth + paddingX * 2);
  const boxH = 22;

  const bx = clamp(Math.round(x - boxW / 2), 8, window.innerWidth - boxW - 8);
  const by = Math.max(8, Math.round(y - boxH - 8));

  // Bubble shadow + body
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.roundRect(bx, by, boxW, boxH, 8);
  ctx.fill();
  ctx.stroke();

  // Little pointer triangle
  const tipX = clamp(Math.round(x), bx + 8, bx + boxW - 8);
  ctx.beginPath();
  ctx.moveTo(tipX - 4, by + boxH);
  ctx.lineTo(tipX + 4, by + boxH);
  ctx.lineTo(tipX, by + boxH + 5);
  ctx.closePath();
  ctx.fill();

  // Text
  ctx.fillStyle = '#f8fafc';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, bx + boxW / 2, by + boxH / 2 + 0.5);
  ctx.restore();
}

export const PixelBuilderOverlay: React.FC = () => {
  const { activeJob, completeActiveJob, subscribeEvents } = usePixelBuilder();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep latest activeJob & callbacks in refs for the rAF loop
  const activeJobRef = useRef(activeJob);
  activeJobRef.current = activeJob;
  const completeActiveJobRef = useRef(completeActiveJob);
  completeActiveJobRef.current = completeActiveJob;

  // Speech bubble ref so events can trigger it immediately
  const speechRef = useRef<{ text: string; until: number } | null>(null);
  const hopRef = useRef<(vyImpulse: number, vxImpulse?: number) => void>(() => {});
  const phraseIdxRef = useRef(0);

  // Subscribe to micro-interaction events (hover/click on CV button)
  useEffect(() => {
    return subscribeEvents((ev: CompanionEvent) => {
      const now = performance.now();
      if (ev.type === 'cv-hover') {
        hopRef.current(-130);
        speechRef.current = { text: 'CV? 📄', until: now + 1300 };
      } else if (ev.type === 'cv-leave') {
        if (speechRef.current?.text === 'CV? 📄') {
          speechRef.current = null;
        }
      } else if (ev.type === 'cv-click') {
        hopRef.current(-195);
        speechRef.current = { text: 'Boa! 🚀', until: now + 1600 };
      } else if (ev.type === 'speech') {
        speechRef.current = { text: ev.text, until: now + (ev.duration ?? 1500) };
      }
    });
  }, [subscribeEvents]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 2; // 26x24 -> 52x48 crisp integer pixels
    const spriteW = SPRITE_COLS * scale;
    const spriteH = SPRITE_ROWS * scale;

    const getHome = () => {
      const btn = document.getElementById('cv-floating-button');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          return {
            x: rect.left + rect.width / 2,
            // Rows 30-31 are empty in 'sit', so +5 places cleats flush on top of the button
            y: rect.top - spriteH / 2 + 5,
          };
        }
      }
      return {
        x: window.innerWidth - 46,
        y: window.innerHeight - spriteH / 2,
      };
    };

    let lastW = 0;
    let lastH = 0;
    let lastDpr = 0;

    const syncCanvasSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      if (w === lastW && h === lastH && dpr === lastDpr) return;
      lastW = w;
      lastH = h;
      lastDpr = dpr;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);

    const initialHome = getHome();
    let x = initialHome.x;
    let y = initialHome.y;
    let vx = 0;
    let vy = 0;
    let mode: Mode = 'idle';

    // Idle animation timers
    let posture: SpritePosture = 'sit';
    let eye: SpriteEye = 'center';
    let nextBlinkAt = performance.now() + 2600;
    let blinkEndAt = 0;
    let nextLookAt = performance.now() + 1800;
    let nextStandAt = performance.now() + 6500;
    let standEndAt = 0;

    // Active build job state
    let currentJobId: string | null = null;
    let targets: DocTarget[] = [];
    let queueIdx = 0;
    let lastEmitAt = 0;
    let falling: FallingChar[] = [];
    let jobFinishingAt = 0;

    hopRef.current = (vyImpulse: number, vxImpulse = 0) => {
      if (mode === 'idle') {
        vy += vyImpulse;
        vx += vxImpulse;
      }
    };

    // Click directly on the mascot micro-interaction
    const onPointerDown = (e: PointerEvent) => {
      if (mode !== 'idle') return;
      // Don't hijack clicks on the CV button itself
      const btn = document.getElementById('cv-floating-button');
      if (btn && btn.contains(e.target as Node)) return;

      const halfW = spriteW / 2 + 6;
      const halfH = spriteH / 2 + 6;
      if (
        e.clientX >= x - halfW &&
        e.clientX <= x + halfW &&
        e.clientY >= y - halfH &&
        e.clientY <= y + halfH
      ) {
        const now = performance.now();
        vy = -180;
        vx = (Math.random() - 0.5) * 60;
        const phrase = IDLE_PHRASES[phraseIdxRef.current % IDLE_PHRASES.length];
        phraseIdxRef.current += 1;
        speechRef.current = { text: phrase, until: now + 1500 };
      }
    };
    window.addEventListener('pointerdown', onPointerDown);

    // Subtle reaction to fast scrolling
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (mode === 'idle' && Math.abs(dy) > 25) {
        vy = clamp(vy - Math.min(Math.abs(dy) * 0.6, 55), -70, 40);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let lastTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      syncCanvasSize();
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const job = activeJobRef.current;

      // Start new job if one arrived
      if (job && job.id !== currentJobId) {
        currentJobId = job.id;
        const sx = window.scrollX;
        const sy = window.scrollY;
        targets = job.getTargets().map((t) => ({
          ...t,
          docX: t.x + sx,
          docY: t.y + sy,
        }));
        queueIdx = 0;
        falling = [];
        lastEmitAt = 0;
        jobFinishingAt = 0;

        if (targets.length === 0) {
          job.onComplete();
          currentJobId = null;
          completeActiveJobRef.current();
        } else {
          mode = 'building';
        }
      }

      const home = getHome();
      let tx = home.x;
      let ty = home.y;
      let stiffness = 280;
      let damping = 24;

      if (mode === 'building' && job) {
        stiffness = 520;
        damping = 32;

        const sx = window.scrollX;
        const sy = window.scrollY;

        if (queueIdx < targets.length) {
          const currentTarget = targets[clamp(queueIdx, 0, targets.length - 1)];
          const liveX = currentTarget.docX - sx;
          const liveY = currentTarget.docY - sy;

          // If the user scrolled the target into/above the navbar or off the bottom,
          // finish revealing cleanly so the companion never gets stuck typing on the navbar.
          if (liveY < 76 || liveY > window.innerHeight + 30) {
            for (const item of falling) {
              job.onReveal(item.idx);
            }
            for (let i = queueIdx; i < targets.length; i++) {
              job.onReveal(targets[i].idx);
            }
            falling = [];
            job.onComplete();
            currentJobId = null;
            mode = 'returning';
            completeActiveJobRef.current();
          } else {
            tx = clamp(
              liveX + currentTarget.w / 2,
              spriteW / 2 + 8,
              window.innerWidth - spriteW / 2 - 8
            );
            ty = clamp(
              liveY - 24,
              Math.max(88, spriteH / 2 + 8),
              window.innerHeight - spriteH / 2 - 8
            );

            // Advance character queue every ~13ms once reasonably close or already flying
            if (now - lastEmitAt >= 13) {
              const dist = Math.hypot(tx - x, ty - y);
              if (queueIdx > 0 || dist < 140) {
                const t = targets[queueIdx];
                falling.push({
                  idx: t.idx,
                  ch: t.ch,
                  docX: t.docX,
                  docTargetY: t.docY,
                  font: t.font,
                  color: t.color,
                  startTime: now,
                  duration: 115,
                });
                queueIdx += 1;
                lastEmitAt = now;
              }
            }
          }
        } else if (falling.length === 0) {
          if (jobFinishingAt === 0) {
            jobFinishingAt = now;
            speechRef.current = { text: 'Done!', until: now + 1500 };
            job.onComplete();
            currentJobId = null;
            mode = 'returning';
            completeActiveJobRef.current();
          }
        } else {
          // Hover near last character while last letters finish falling
          const lastT = targets[targets.length - 1];
          const liveLastX = lastT.docX - sx;
          const liveLastY = lastT.docY - sy;
          tx = clamp(
            liveLastX + lastT.w / 2,
            spriteW / 2 + 8,
            window.innerWidth - spriteW / 2 - 8
          );
          ty = clamp(
            liveLastY - 24,
            Math.max(88, spriteH / 2 + 8),
            window.innerHeight - spriteH / 2 - 8
          );
        }
      } else if (mode === 'returning') {
        const dist = Math.hypot(home.x - x, home.y - y);
        if (dist < 2 && Math.hypot(vx, vy) < 8) {
          x = home.x;
          y = home.y;
          vx = 0;
          vy = 0;
          mode = 'idle';
        }
      }

      // Spring physics integration
      const ax = (tx - x) * stiffness - vx * damping;
      const ay = (ty - y) * stiffness - vy * damping;
      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;

      // Update idle facial/posture state machine
      if (mode === 'idle') {
        if (now >= nextStandAt) {
          posture = 'stand';
          eye = 'up';
          standEndAt = now + 2400 + Math.random() * 1200;
          nextStandAt = standEndAt + 6000 + Math.random() * 5000;
        } else if (standEndAt > 0 && now >= standEndAt) {
          posture = 'sit';
          eye = 'center';
          standEndAt = 0;
        }

        if (now >= nextBlinkAt) {
          blinkEndAt = now + 130;
          nextBlinkAt = now + 2400 + Math.random() * 2400;
        }

        if (now >= nextLookAt && posture === 'sit') {
          const looks: SpriteEye[] = ['center', 'left', 'right', 'center'];
          eye = looks[Math.floor(Math.random() * looks.length)];
          nextLookAt = now + 1600 + Math.random() * 2200;
        }
      } else {
        posture = 'stand';
        eye = vx > 25 ? 'right' : vx < -25 ? 'left' : 'center';
      }

      const activeEye: SpriteEye = now < blinkEndAt ? 'blink' : eye;

      // Clear viewport
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update & draw falling characters
      const stillFalling: FallingChar[] = [];
      for (const item of falling) {
        const progress = (now - item.startTime) / item.duration;
        if (progress >= 1) {
          job?.onReveal(item.idx);
        } else {
          const eased = easeOutCubic(clamp(progress, 0, 1));
          const liveX = item.docX - window.scrollX;
          const liveTargetY = item.docTargetY - window.scrollY;
          const drawY = liveTargetY - 12 * (1 - eased);
          ctx.save();
          ctx.font = item.font;
          ctx.fillStyle = item.color;
          ctx.textBaseline = 'top';
          ctx.globalAlpha = 0.35 + 0.65 * eased;
          ctx.fillText(item.ch, liveX, drawY);
          ctx.restore();
          stillFalling.push(item);
        }
      }
      falling = stillFalling;

      // Draw companion sprite
      const isFlying = mode !== 'idle';
      const floatOffset = isFlying ? Math.sin(now / 110) * 1.2 : 0;
      const drawX = Math.round(x);
      const drawY = Math.round(y + floatOffset);

      // Subtle elliptical shadow only when flying
      if (isFlying) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
        ctx.beginPath();
        ctx.ellipse(drawX, Math.round(y + spriteH / 2 + 8), 16, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const frameCanvas = getSpriteFrame(posture, activeEye);
      ctx.save();
      ctx.translate(drawX, drawY);
      if (isFlying) {
        ctx.rotate(clamp(vx * 0.0009, -0.26, 0.26));
      }
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        frameCanvas,
        Math.round(-spriteW / 2),
        Math.round(-spriteH / 2),
        spriteW,
        spriteH
      );
      ctx.restore();

      // Speech bubble
      if (speechRef.current) {
        if (now < speechRef.current.until) {
          drawSpeechBubble(ctx, drawX, drawY - spriteH / 2, speechRef.current.text);
        } else {
          speechRef.current = null;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', syncCanvasSize);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
};
