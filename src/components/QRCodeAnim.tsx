import React from 'react';
import {interpolate} from 'remotion';

interface Props {
  frame: number;
  size?: number;
}

// Fixed QR-like pixel pattern (1 = dark, 0 = light) — 9x9 grid
const PATTERN = [
  [1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0],
  [1,0,1,1,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,0],
  [1,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,0,1,0],
  [1,1,0,1,0,1,1,0,1],
];

// Reveal order: corners first, then inner cells
const REVEAL_ORDER: number[] = [];
// Top-left corner block indices
for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
  if (r < 7 && c < 7) REVEAL_ORDER.push(r * 9 + c);
}
for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
  const idx = r * 9 + c;
  if (!REVEAL_ORDER.includes(idx)) REVEAL_ORDER.push(idx);
}

export const QRCodeAnim: React.FC<Props> = ({frame, size = 260}) => {
  const cellSize = size / 9;
  const totalCells = REVEAL_ORDER.length;
  const cellsVisible = Math.min(
    Math.floor(interpolate(frame, [0, 60], [0, totalCells], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })),
    totalCells,
  );

  const scanY = interpolate(frame, [60, 90], [-size * 0.1, size * 1.1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="qr-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="qr-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(6,182,212,0)" />
          <stop offset="50%" stopColor="rgba(6,182,212,0.6)" />
          <stop offset="100%" stopColor="rgba(6,182,212,0)" />
        </linearGradient>
      </defs>

      {PATTERN.flat().map((val, i) => {
        const revealIdx = REVEAL_ORDER.indexOf(i);
        const visible = revealIdx < cellsVisible;
        const r = Math.floor(i / 9);
        const c = i % 9;
        if (!val) return null;
        return (
          <rect
            key={i}
            x={c * cellSize + 1}
            y={r * cellSize + 1}
            width={cellSize - 2}
            height={cellSize - 2}
            rx={2}
            fill={visible ? '#06B6D4' : 'transparent'}
            filter={visible ? 'url(#qr-glow)' : undefined}
            opacity={visible ? 1 : 0}
          />
        );
      })}

      {frame > 60 && (
        <rect x={0} y={scanY - 8} width={size} height={16}
          fill="url(#qr-scan)" opacity={0.8} />
      )}
    </svg>
  );
};
