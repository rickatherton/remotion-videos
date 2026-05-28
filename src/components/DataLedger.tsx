import React from 'react';
import {interpolate} from 'remotion';
import {FONT, TC} from '../lib/techTheme';

interface Props {
  frame: number;
  count?: number;
}

const ENTRIES = [
  {time: '09:14:03', hash: '0x4a2c8f…e91b', status: 'VERIFIED', label: 'IoT Capture'},
  {time: '09:14:17', hash: '0x7b1e3d…42ca', status: 'VERIFIED', label: 'Sensor Payload'},
  {time: '09:14:31', hash: '0xa93fc1…56d8', status: 'VERIFIED', label: 'Chain Commit'},
  {time: '09:14:45', hash: '0x2e4b8a…73f2', status: 'VERIFIED', label: 'ESG Metric'},
  {time: '09:14:59', hash: '0x6f821c…94e1', status: 'VERIFIED', label: 'Audit Record'},
];

export const DataLedger: React.FC<Props> = ({frame, count = 5}) => {
  const entries = ENTRIES.slice(0, count);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      {entries.map((entry, i) => {
        const delay = i * 20;
        const p = interpolate(frame - delay, [0, 22], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              opacity: p,
              transform: `translateX(${(1 - p) * 40}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '14px 20px',
              background: TC.card,
              border: `1px solid ${p > 0.5 ? 'rgba(16,185,129,0.35)' : TC.border}`,
              borderRadius: 8,
            }}
          >
            <span style={{fontFamily: 'monospace', fontSize: 14, color: TC.muted, width: 80}}>
              {entry.time}
            </span>
            <span style={{fontFamily: 'monospace', fontSize: 14, color: TC.cyan, flex: 1}}>
              {entry.hash}
            </span>
            <span style={{fontFamily: FONT, fontSize: 13, color: TC.muted, width: 120}}>
              {entry.label}
            </span>
            <span style={{
              fontFamily: FONT, fontSize: 12, fontWeight: 700,
              color: TC.green, letterSpacing: 1,
            }}>
              ✓ {entry.status}
            </span>
          </div>
        );
      })}
    </div>
  );
};
