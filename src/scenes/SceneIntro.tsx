import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT_FAMILY} from '../lib/theme';

const BRAND = 'UBLOQUITY';

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [48, 84], [0, 580], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        opacity: bgOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{display: 'flex', alignItems: 'baseline', gap: 2}}>
        {BRAND.split('').map((letter, i) => {
          const delay = i * 5;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: {damping: 18, stiffness: 200, mass: 0.8},
          });
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 128,
                fontWeight: 900,
                letterSpacing: 14,
                color: COLORS.primary,
                opacity: progress,
                transform: `translateY(${interpolate(progress, [0, 1], [60, 0])}px) scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
                display: 'inline-block',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      <div
        style={{
          width: lineWidth,
          height: 4,
          backgroundColor: COLORS.accent,
          marginTop: 20,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
