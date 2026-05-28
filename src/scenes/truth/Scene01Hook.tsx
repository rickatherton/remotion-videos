import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {QRCodeAnim} from '../../components/QRCodeAnim';
import {FONT, TC} from '../../lib/techTheme';

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const qrP = spring({frame: frame - 10, fps, config: {damping: 20, stiffness: 130}});
  const h1P = interpolate(frame, [35, 65], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const h2P = interpolate(frame, [70, 105], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const h3P = interpolate(frame, [120, 155], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', alignItems: 'center',
      padding: '0 140px', gap: 100,
    }}>
      <div style={{
        opacity: qrP,
        transform: `scale(${interpolate(qrP, [0, 1], [0.6, 1])}) rotate(${interpolate(qrP, [0, 1], [-8, 0])}deg)`,
        filter: 'drop-shadow(0 0 40px rgba(6,182,212,0.5))',
      }}>
        <QRCodeAnim frame={frame} size={320} />
      </div>

      <div style={{flex: 1}}>
        <div style={{
          fontFamily: FONT, fontSize: 22, fontWeight: 600,
          color: TC.cyan, letterSpacing: 4, textTransform: 'uppercase',
          opacity: h1P, marginBottom: 28,
        }}>
          Did you know?
        </div>
        <div style={{
          fontFamily: FONT, fontSize: 62, fontWeight: 800,
          color: TC.primary, lineHeight: 1.1, letterSpacing: -1.5,
          opacity: h2P, transform: `translateY(${(1 - h2P) * 30}px)`,
          marginBottom: 32,
        }}>
          One Digital Product Passport can satisfy{' '}
          <span style={{color: TC.accent}}>thousands of global regulations.</span>
        </div>
        <div style={{
          fontFamily: FONT, fontSize: 26, color: TC.muted,
          lineHeight: 1.6, opacity: h3P,
        }}>
          Capture once. Share everywhere. Always compliant.
        </div>
      </div>
    </AbsoluteFill>
  );
};
