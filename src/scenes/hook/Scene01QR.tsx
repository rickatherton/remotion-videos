import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {QRCodeAnim} from '../../components/QRCodeAnim';
import {FONT, TC} from '../../lib/techTheme';

export const Scene01QR: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const qrP = spring({frame: frame - 5, fps, config: {damping: 18, stiffness: 160}});
  const textP = interpolate(frame, [30, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80,
    }}>
      <div style={{
        opacity: qrP,
        transform: `scale(${interpolate(qrP, [0, 1], [0.5, 1])})`,
        filter: 'drop-shadow(0 0 60px rgba(6,182,212,0.6))',
      }}>
        <QRCodeAnim frame={frame} size={380} />
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 80, fontWeight: 900,
        color: TC.primary, letterSpacing: -2,
        opacity: textP,
        transform: `translateX(${(1 - textP) * 40}px)`,
      }}>
        Did you<br />
        <span style={{color: TC.cyan}}>know?</span>
      </div>
    </AbsoluteFill>
  );
};
