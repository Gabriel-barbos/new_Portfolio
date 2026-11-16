export type SpritePosture = 'sit' | 'stand';
export type SpriteEye = 'center' | 'left' | 'right' | 'up' | 'blink';

export const SPRITE_COLS = 34;
export const SPRITE_ROWS = 32;

const PALETTE: Record<string, string> = {
  H: '#161616', // Hair
  h: '#2d2d2d', // Hair / eyebrow accent
  S: '#da6d44', // Skin
  s: '#bf5732', // Skin shadow
  E: '#09090b', // Eyes
  W: '#f4f4f5', // White jersey / shorts / socks
  w: '#d4d4d8', // Jersey / text / shade
  B: '#18181b', // Black trim, CR7 print, stripes, boots
  G: '#eab308', // Gold crest / crown
  g: '#ca8a04', // Darker gold
};

// 34 cols x 32 rows — Claudinho CR7 detailed pixel art
const HEAD_AND_TORSO: string[] = [
  '..........HHHHHHHHHHHHHH..........', // 0: Hair top
  '........HHHHHHHHHHHHHHHHHH........', // 1
  '.......HHHHHHHHHHHHHHHHHHHH.......', // 2
  '......HHHHHHHHHHHHHHSSSSSHHH......', // 3: Hair swoop
  '......HHHHHHHHHHHSSSSSSSSSHh......', // 4: Hair side + right temple
  '......HHHHHHSSSSSSSSSSShhhhh......', // 5: Right eyebrow
  '......HHHSSSSSSSSSSSSSSSSSSS......', // 6
  '......HHSSSSSSSSSSSSSSSSSSSS......', // 7
  '......SSSSSSSSSSSSSSSSSSSSSS......', // 8: Eye zone
  '......SSSSSSSSSSSSSSSSSSSSSS......', // 9: Eye zone
  '......SSSSSSSSSSSSSSSSSSSSSS......', // 10: Eye zone
  '......SSSSSSSSSSSSSSSSSSSSSS......', // 11: Eye zone
  '......SSSSSSSSSSSSSSSSSSSSSS......', // 12
  '.......SSSSSSSSSSSSSSSSSSSS.......', // 13: Chin
  '..SSS.WWBBWWWWWWWWWWWWWWBBWW.SSS..', // 14: Hands + shoulder trim
  '..SSS.WWWBWWWWWWWWWWWWWBGBWW.SSS..', // 15: Hands + collar + crest crown
  '..SSS.WWWWBBWWWWWWWWWWBGBGWW.SSS..', // 16: Hands + collar + gold/black CR crest
  '......WWWWWWwBwBwBwBwWWBBWWW......', // 17: "CLAUDINHO" micro-print
  '......WWWWWWWWWWWWWWWWWWWWWW......', // 18
  '......WWWWWWBBBWBBWWBBBWWWWW......', // 19: "CR7" row 1
  '......WWWWWWBWWWBWBBWWBWWWWW......', // 20: "CR7" row 2
  '......WWWWWWBWWWBBWWWWBWWWWW......', // 21: "CR7" row 3
  '......WWWWWWBWWWBWBWWBWWWWWW......', // 22: "CR7" row 4
  '......WWWWWWBBBWBBWWWBWWWWWW......', // 23: "CR7" row 5
];

const SHORTS_AND_LEGS_STAND: string[] = [
  '........BWBWWWWWWWWWWWWBWB........', // 24: Shorts top + 3-stripe sides
  '........BWBWWWWWWWWWWBBWWB........', // 25: Shorts + "7" top
  '........BWBWWWWWW..WWWWBWB........', // 26: Shorts + "7" + leg gap
  '........BWBWWWWWW..WWWBWWB........', // 27: Shorts hem
  '.........SSSSSS......SSSSSS.......', // 28: Knees
  '.........WWWWWW......WWWWWW.......', // 29: White socks
  '.........BBBBBB......BBBBBB.......', // 30: Sock black band
  '.........BBBBBB......BBBBBB.......', // 31: Black cleats
];

const SHORTS_AND_LEGS_SIT: string[] = [
  '........BWBWWWWWWWWWWWWBWB........', // 24: Shorts top
  '........BWBWWWWWWWWWWBBWWB........', // 25: Shorts + "7"
  '........BWBWWWWWW..WWWWBWB........', // 26: Shorts
  '........BWBWWWWWW..WWWBWWB........', // 27: Shorts hem
  '........SSSSWWW......WWWSSSS......', // 28: Seated legs + socks
  '........BBBBBBB......BBBBBBB......', // 29: Seated cleats resting on button
  '..................................', // 30
  '..................................', // 31
];

function buildGrid(posture: SpritePosture, eye: SpriteEye): string[][] {
  const base = [
    ...HEAD_AND_TORSO,
    ...(posture === 'stand' ? SHORTS_AND_LEGS_STAND : SHORTS_AND_LEGS_SIT),
  ];

  const grid = base.map((row) => row.split(''));

  // Eye coordinates (symmetric inside head cols 6..27)
  const leftCols = eye === 'left' ? [9, 10] : eye === 'right' ? [11, 12] : [10, 11];
  const rightCols = eye === 'left' ? [21, 22] : eye === 'right' ? [23, 24] : [22, 23];

  if (eye === 'blink') {
    for (const c of [...leftCols, ...rightCols]) {
      grid[11][c] = 'E';
    }
  } else {
    const rows = eye === 'up' ? [7, 8, 9, 10] : [8, 9, 10, 11];
    for (const r of rows) {
      for (const c of [...leftCols, ...rightCols]) {
        grid[r][c] = 'E';
      }
    }
  }

  return grid;
}

const frameCache = new Map<string, HTMLCanvasElement>();

/**
 * Returns an offscreen 1x1-per-pixel canvas for the given posture and eye state.
 * Cached so main canvas draws with zero seams via imageSmoothingEnabled = false.
 */
export function getSpriteFrame(posture: SpritePosture, eye: SpriteEye): HTMLCanvasElement {
  const key = `${posture}:${eye}`;
  const cached = frameCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = SPRITE_COLS;
  canvas.height = SPRITE_ROWS;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grid = buildGrid(posture, eye);
    for (let y = 0; y < SPRITE_ROWS; y++) {
      for (let x = 0; x < SPRITE_COLS; x++) {
        const ch = grid[y][x];
        const color = PALETTE[ch];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }

  frameCache.set(key, canvas);
  return canvas;
}
