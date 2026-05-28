import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, TC} from '../../lib/techTheme';

const SECTORS = [
  {icon: '✈', label: 'Aerospace', sub: 'Component traceability'},
  {icon: '⚙', label: 'Manufacturing', sub: 'Process integrity'},
  {icon: '🌿', label: 'Agri-food', sub: 'Farm-to-fork'},
  {icon: '⚡', label: 'Energy', sub: 'ESG compliance'},
  {icon: '💊', label: 'Pharma', sub: 'Cold chain & serialisation'},
  {icon: '🚢', label: 'Logistics', sub: 'Cross-border visibility'},
];

export const Scene02Breadth: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelP = interpolate(frame, [8, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const headP = spring({frame: frame - 20, fps, config: {damping: 20, stiffness: 140}});

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', flexDirection: 'column',
      padding: '60px 140px',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 18, fontWeight: 600,
        color: TC.cyan, letterSpacing: 4, textTransform: 'uppercase',
        opacity: labelP, marginBottom: 20,
      }}>
        Proven at scale
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 58, fontWeight: 800,
        color: TC.primary, lineHeight: 1.1, letterSpacing: -1.5,
        opacity: headP, transform: `translateY(${(1 - headP) * 25}px)`,
        marginBottom: 56,
      }}>
        DLT-backed passports.<br />
        <span style={{color: TC.accent}}>Every sector. Every scale.</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20, flex: 1,
      }}>
        {SECTORS.map(({icon, label, sub}, i) => {
          const p = spring({
            frame: frame - 55 - i * 20, fps,
            config: {damping: 22, stiffness: 170, mass: 0.8},
          });
          return (
            <div key={label} style={{
              padding: '28px 32px',
              background: TC.card,
              border: `1px solid ${TC.border}`,
              borderRadius: 16,
              opacity: p,
              transform: `translateY(${(1 - p) * 40}px)`,
            }}>
              <div style={{fontSize: 40, marginBottom: 12}}>{icon}</div>
              <div style={{
                fontFamily: FONT, fontSize: 28, fontWeight: 700,
                color: TC.primary, marginBottom: 8,
              }}>
                {label}
              </div>
              <div style={{fontFamily: FONT, fontSize: 18, color: TC.muted}}>
                {sub}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
