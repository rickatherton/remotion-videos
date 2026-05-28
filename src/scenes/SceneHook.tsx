import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT_FAMILY} from '../lib/theme';

const WORDS = [
  {text: 'IDEAS.', color: COLORS.primary},
  {text: 'BUILT.', color: COLORS.primary},
  {text: 'SHIPPED.', color: COLORS.accent},
];

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const descriptorOpacity = interpolate(frame, [120, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        opacity: sceneOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 160,
        paddingRight: 160,
      }}
    >
      {WORDS.map(({text, color}, i) => {
        const delay = i * 35;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: {damping: 20, stiffness: 150, mass: 0.9},
        });
        return (
          <div
            key={text}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 152,
              fontWeight: 900,
              color,
              letterSpacing: -3,
              lineHeight: 1.0,
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [90, 0])}px)`,
            }}
          >
            {text}
          </div>
        );
      })}

      <div
        style={{
          marginTop: 52,
          fontFamily: FONT_FAMILY,
          fontSize: 34,
          color: COLORS.muted,
          fontWeight: 400,
          opacity: descriptorOpacity,
          maxWidth: 760,
          lineHeight: 1.6,
        }}
      >
        Strategy, design, and development for businesses that want to grow fast.
      </div>
    </AbsoluteFill>
  );
};
