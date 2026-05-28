import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, TC} from '../../lib/techTheme';

export const Scene04CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const wordP = spring({frame: frame - 12, fps, config: {damping: 20, stiffness: 140}});
  const tagP = interpolate(frame, [45, 75], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const urlP = spring({frame: frame - 80, fps, config: {damping: 22, stiffness: 130}});

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 164, fontWeight: 900,
        color: TC.primary, letterSpacing: -5, lineHeight: 0.9,
        opacity: wordP, transform: `scale(${interpolate(wordP, [0, 1], [0.85, 1])})`,
        filter: 'drop-shadow(0 0 50px rgba(37,99,235,0.3))',
      }}>
        UBLOQUITY
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 30, color: TC.muted, fontStyle: 'italic',
        marginTop: 28, opacity: tagP,
      }}>
        The future of global trade starts here.
      </div>

      <div style={{
        marginTop: 44, display: 'flex', alignItems: 'center', gap: 20,
        opacity: urlP,
      }}>
        <div style={{width: 80, height: 3, backgroundColor: TC.accent, borderRadius: 2}} />
        <div style={{fontFamily: FONT, fontSize: 34, fontWeight: 500, color: TC.accent, letterSpacing: 3}}>
          ubloquity.io
        </div>
        <div style={{width: 80, height: 3, backgroundColor: TC.accent, borderRadius: 2}} />
      </div>
    </AbsoluteFill>
  );
};
