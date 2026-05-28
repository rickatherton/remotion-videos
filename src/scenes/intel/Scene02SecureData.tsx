import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {NetworkNodes} from '../../components/NetworkNodes';
import {FONT, TC} from '../../lib/techTheme';

export const Scene02SecureData: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  void fps;

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelP = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const headlineP = interpolate(frame, [30, 65], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const bodyP = interpolate(frame, [75, 110], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const tagP = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: TC.bg, opacity: fadeIn, display: 'flex'}}>
      {/* Left: copy */}
      <div style={{
        width: 820, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', paddingLeft: 140, paddingRight: 80,
      }}>
        <div style={{
          fontFamily: FONT, fontSize: 18, fontWeight: 600,
          color: TC.cyan, letterSpacing: 4, textTransform: 'uppercase',
          opacity: labelP, marginBottom: 28,
        }}>
          Did you know?
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 64, fontWeight: 800,
          color: TC.primary, lineHeight: 1.1, letterSpacing: -1.5,
          opacity: headlineP,
          transform: `translateY(${(1 - headlineP) * 30}px)`,
          marginBottom: 32,
        }}>
          Private blockchain.<br />
          <span style={{color: TC.accent}}>Total trust.</span>
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 28, color: TC.muted,
          lineHeight: 1.6, opacity: bodyP,
          transform: `translateY(${(1 - bodyP) * 20}px)`,
          maxWidth: 580,
        }}>
          We share data securely across every tier of your supply chain — improving
          trust and efficiency without compromising confidentiality.
        </div>

        <div style={{
          display: 'flex', gap: 16, marginTop: 40, opacity: tagP,
        }}>
          {['Permissioned', 'Immutable', 'Cross-Tier'].map(tag => (
            <div key={tag} style={{
              fontFamily: FONT, fontSize: 15, fontWeight: 600,
              color: TC.accent, letterSpacing: 1,
              padding: '8px 20px',
              border: `1px solid rgba(37,99,235,0.45)`,
              borderRadius: 100,
              background: 'rgba(37,99,235,0.08)',
            }}>{tag}</div>
          ))}
        </div>
      </div>

      {/* Right: network animation */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingRight: 80,
      }}>
        <NetworkNodes frame={frame} />
      </div>
    </AbsoluteFill>
  );
};
