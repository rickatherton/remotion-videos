import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT_FAMILY} from '../lib/theme';

const PILLARS = [
  {
    number: '01',
    title: 'Strategy',
    description: 'We map the path from vision to product — clearly and quickly.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Interfaces that feel effortless and look remarkable.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Built to scale. Shipped on time. Every time.',
  },
];

export const ScenePillars: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelProgress = spring({
    frame: frame - 5,
    fps,
    config: {damping: 20, stiffness: 150},
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
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 20,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: 5,
          textTransform: 'uppercase' as const,
          opacity: labelProgress,
          marginBottom: 72,
        }}
      >
        What we do
      </div>

      <div style={{display: 'flex', gap: 80, width: '100%'}}>
        {PILLARS.map(({number, title, description}, i) => {
          const delay = 28 + i * 42;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: {damping: 22, stiffness: 160, mass: 0.9},
          });

          return (
            <div
              key={number}
              style={{
                flex: 1,
                opacity: progress,
                transform: `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 80,
                  fontWeight: 800,
                  color: COLORS.accent,
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {number}
              </div>

              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 46,
                  fontWeight: 700,
                  color: COLORS.primary,
                  marginBottom: 18,
                  lineHeight: 1.1,
                }}
              >
                {title}
              </div>

              <div
                style={{
                  width: 48,
                  height: 3,
                  backgroundColor: COLORS.accent,
                  marginBottom: 22,
                  borderRadius: 2,
                }}
              />

              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  color: COLORS.muted,
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}
              >
                {description}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
