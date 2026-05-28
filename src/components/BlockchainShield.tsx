import React from 'react';
import {interpolate, spring} from 'remotion';

interface Props {
  frame: number;
  fps: number;
}

const SHIELD =
  'M 200 20 L 380 80 L 380 230 L 200 390 L 20 230 L 20 80 Z';
const PERIMETER = 1180;

const BLOCKS = [
  'HASH: 0x4a2c…f891',
  'HASH: 0x7b1e…3d42',
  'HASH: 0xa93f…c156',
];

export const BlockchainShield: React.FC<Props> = ({frame, fps}) => {
  const strokeP = interpolate(frame, [5, 55], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const checkP = spring({
    frame: frame - 115,
    fps,
    config: {damping: 15, stiffness: 150},
  });

  return (
    <svg width={400} height={420} viewBox="0 0 400 420">
      <defs>
        <filter id="bs-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="bs-clip"><path d={SHIELD} /></clipPath>
      </defs>

      <path
        d={SHIELD}
        fill="rgba(37,99,235,0.07)"
        stroke="#2563EB" strokeWidth={3}
        strokeDasharray={PERIMETER}
        strokeDashoffset={PERIMETER * (1 - strokeP)}
        filter="url(#bs-glow)"
      />

      <g clipPath="url(#bs-clip)">
        {BLOCKS.map((label, i) => {
          const p = spring({
            frame: frame - 45 - i * 22,
            fps,
            config: {damping: 22, stiffness: 200},
          });
          const yBase = 170 + i * 62;
          return (
            <g key={i} opacity={p} transform={`translate(0, ${(1 - p) * 28})`}>
              <rect x={48} y={yBase} width={304} height={52} rx={4}
                fill="rgba(37,99,235,0.18)" stroke="rgba(37,99,235,0.45)" strokeWidth={1} />
              <text x={200} y={yBase + 30} textAnchor="middle"
                fill="#06B6D4" fontFamily="monospace" fontSize={13}>{label}</text>
            </g>
          );
        })}
      </g>

      <text x={200} y={120} textAnchor="middle"
        fill="#10B981" fontSize={52} fontFamily="sans-serif"
        opacity={checkP} filter="url(#bs-glow)">
        ✓
      </text>
    </svg>
  );
};
