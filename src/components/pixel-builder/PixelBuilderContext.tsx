import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

export interface CharTarget {
  idx: number;
  ch: string;
  x: number;
  y: number;
  w: number;
  h: number;
  font: string;
  color: string;
}

export interface BuildJob {
  id: string;
  getTargets: () => CharTarget[];
  onReveal: (idx: number) => void;
  onComplete: () => void;
}

export type CompanionEvent =
  | { type: 'cv-hover' }
  | { type: 'cv-leave' }
  | { type: 'cv-click' }
  | { type: 'speech'; text: string; duration?: number };

type EventListener = (event: CompanionEvent) => void;

interface PixelBuilderContextValue {
  activeJob: BuildJob | null;
  enqueueBuild: (job: BuildJob) => void;
  completeActiveJob: () => void;
  emitCompanionEvent: (event: CompanionEvent) => void;
  subscribeEvents: (listener: EventListener) => () => void;
}

const PixelBuilderContext = createContext<PixelBuilderContextValue | null>(null);

export const PixelBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeJob, setActiveJob] = useState<BuildJob | null>(null);
  const queueRef = useRef<BuildJob[]>([]);
  const activeIdRef = useRef<string | null>(null);
  const listenersRef = useRef<Set<EventListener>>(new Set());

  const enqueueBuild = useCallback((job: BuildJob) => {
    if (activeIdRef.current === job.id || queueRef.current.some((j) => j.id === job.id)) {
      return;
    }

    if (!activeIdRef.current) {
      activeIdRef.current = job.id;
      setActiveJob(job);
    } else {
      queueRef.current.push(job);
    }
  }, []);

  const completeActiveJob = useCallback(() => {
    const next = queueRef.current.shift() ?? null;
    activeIdRef.current = next ? next.id : null;
    setActiveJob(next);
  }, []);

  const emitCompanionEvent = useCallback((event: CompanionEvent) => {
    listenersRef.current.forEach((fn) => fn(event));
  }, []);

  const subscribeEvents = useCallback((listener: EventListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  return (
    <PixelBuilderContext.Provider
      value={{
        activeJob,
        enqueueBuild,
        completeActiveJob,
        emitCompanionEvent,
        subscribeEvents,
      }}
    >
      {children}
    </PixelBuilderContext.Provider>
  );
};

export function usePixelBuilder(): PixelBuilderContextValue {
  const ctx = useContext(PixelBuilderContext);
  if (!ctx) {
    throw new Error('usePixelBuilder must be used within a PixelBuilderProvider');
  }
  return ctx;
}

/**
 * Collects bounding rects and computed typography for all non-whitespace
 * `[data-build-idx]` spans inside `container`.
 */
export function collectBuildTargets(
  container: HTMLElement | null,
  fallbackColor?: string
): CharTarget[] {
  if (!container) return [];
  const spans = container.querySelectorAll<HTMLElement>('[data-build-idx]');
  const targets: CharTarget[] = [];

  spans.forEach((el) => {
    const idxAttr = el.getAttribute('data-build-idx');
    if (idxAttr === null) return;
    const idx = Number(idxAttr);
    const ch = el.textContent ?? '';
    if (!ch || /\s/.test(ch)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;

    const style = window.getComputedStyle(el);
    const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    let color = style.color;
    // Handle gradient text where -webkit-text-fill-color makes computed color transparent
    const fill = style.webkitTextFillColor;
    if (
      (fill && (fill === 'transparent' || fill === 'rgba(0, 0, 0, 0)')) ||
      color === 'rgba(0, 0, 0, 0)'
    ) {
      color = fallbackColor ?? '#2563eb';
    }

    targets.push({
      idx,
      ch,
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
      font,
      color,
    });
  });

  return targets.sort((a, b) => a.idx - b.idx);
}
