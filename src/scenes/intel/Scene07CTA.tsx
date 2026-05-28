import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, TC} from '../../lib/techTheme';

export const Scene07CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const wordmarkP = spring({
    frame: frame - 15, fps,
    config: {damping: 20, stiffness: 140, mass: 1},
  });

  const taglineP = interpolate(frame, [55, 88], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const urlP = spring({
    frame: frame - 90, fps,
    config: {damping: 22, stiffness: 130},
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 168, fontWeight: 900,
        color: TC.primary, letterSpacing: -5, lineHeight: 0.9,
        opacity: wordmarkP,
        transform: `scale(${interpolate(wordmarkP, [0, 1], [0.8, 1])})`,
        filter: `drop-shadow(0 0 60px rgba(37,99,235,0.35))`,
      }}>
        UBLOQUITY
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 36, fontWeight: 400,
        color: TC.muted, letterSpacing: 1,
        marginTop: 28, opacity: taglineP,
        fontStyle: 'italic',
      }}>
        Move with absolute confidence.
      </div>

      <div style={{
        marginTop: 44,
        display: 'flex', alignItems: 'center', gap: 20,
        opacity: urlP,
      }}>
        <div style={{width: 90, height: 3, backgroundColor: TC.accent, borderRadius: 2}} />
        <div style={{
          fontFamily: FONT, fontSize: 34, fontWeight: 500,
          color: TC.accent, letterSpacing: 3,
        }}>
          ubloquity.io
        </div>
        <div style={{width: 90, height: 3, backgroundColor: TC.accent, borderRadius: 2}} />
      </div>
    </AbsoluteFill>
  );
};
