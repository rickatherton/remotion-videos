import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, TC} from '../../lib/techTheme';

const WORDS = [
  {text: 'ASSIGN.', color: TC.primary},
  {text: 'CAPTURE.', color: TC.cyan},
  {text: 'VALIDATE.', color: TC.accent},
  {text: 'SHARE.', color: TC.green},
];

export const Scene06Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const bridgeP = interpolate(frame, [120, 155], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 20, fontWeight: 600,
        color: TC.muted, letterSpacing: 4, textTransform: 'uppercase',
        marginBottom: 48,
        opacity: interpolate(frame, [5, 25], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        }),
      }}>
        The ubloquity workflow
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 0}}>
        {WORDS.map(({text, color}, i) => {
          const delay = i * 30;
          const p = spring({
            frame: frame - delay - 20, fps,
            config: {damping: 18, stiffness: 160, mass: 0.8},
          });
          const flash = interpolate(frame - delay - 20, [0, 8], [2.5, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          return (
            <React.Fragment key={text}>
              <div style={{
                fontFamily: FONT, fontSize: 90, fontWeight: 900,
                color, letterSpacing: -2, lineHeight: 1,
                opacity: p,
                transform: `scale(${interpolate(p, [0, 1], [0.5, 1]) * flash})`,
                filter: p > 0.1 ? `drop-shadow(0 0 30px ${color}60)` : 'none',
                padding: '0 16px',
              }}>
                {text}
              </div>
              {i < WORDS.length - 1 && (
                <div style={{
                  width: 3, height: 80,
                  background: TC.border, borderRadius: 2, flexShrink: 0,
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 30, color: TC.muted,
        marginTop: 56, opacity: bridgeP, textAlign: 'center',
        maxWidth: 900, lineHeight: 1.6,
      }}>
        "We don't just show you <em>where</em> it is. We prove{' '}
        <span style={{color: TC.primary, fontStyle: 'normal', fontWeight: 600}}>
          what it is, who owns it, and that it's trusted.
        </span>"
      </div>
    </AbsoluteFill>
  );
};
