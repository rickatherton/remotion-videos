import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FONT, TC} from '../../lib/techTheme';

const LINE1 = 'Did you know';
const LINE2 = 'that the biggest friction in global trade';
const LINE3 = "isn't distance...";
const LINE4 = "it's doubt?";

export const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const line1p = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const line2p = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const line3p = interpolate(frame, [95, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const line4p = interpolate(frame, [130, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const accentLineW = interpolate(frame, [170, 200], [0, 320], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: TC.bg,
        opacity: fadeIn,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 160px',
      }}
    >
      <div style={{textAlign: 'center', maxWidth: 1200}}>
        <div style={{
          fontFamily: FONT, fontSize: 28, fontWeight: 500,
          color: TC.cyan, letterSpacing: 3,
          opacity: line1p, marginBottom: 24,
          transform: `translateY(${(1 - line1p) * 20}px)`,
        }}>
          {LINE1}
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 72, fontWeight: 800,
          color: TC.primary, lineHeight: 1.1, letterSpacing: -1,
          opacity: line2p,
          transform: `translateY(${(1 - line2p) * 30}px)`,
        }}>
          {LINE2}
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 72, fontWeight: 800,
          color: TC.muted, lineHeight: 1.1, letterSpacing: -1,
          opacity: line3p,
          transform: `translateY(${(1 - line3p) * 30}px)`,
        }}>
          {LINE3}
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 88, fontWeight: 900,
          color: TC.accent, lineHeight: 1.0, letterSpacing: -2,
          opacity: line4p,
          transform: `translateY(${(1 - line4p) * 40}px)`,
          marginTop: 8,
        }}>
          {LINE4}
        </div>
      </div>

      <div style={{
        width: accentLineW, height: 3,
        backgroundColor: TC.cyan, borderRadius: 2, marginTop: 48,
      }} />
    </AbsoluteFill>
  );
};
