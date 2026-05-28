import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT_FAMILY} from '../lib/theme';

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelProgress = spring({
    frame: frame - 10,
    fps,
    config: {damping: 18, stiffness: 150, mass: 1},
  });

  const wordmarkProgress = spring({
    frame: frame - 40,
    fps,
    config: {damping: 20, stiffness: 160, mass: 0.9},
  });

  const urlProgress = spring({
    frame: frame - 85,
    fps,
    config: {damping: 20, stiffness: 140, mass: 1},
  });

  const taglineOpacity = interpolate(frame, [110, 145], [0, 1], {
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
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 26,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: 6,
          textTransform: 'uppercase' as const,
          opacity: labelProgress,
          marginBottom: 28,
        }}
      >
        Ready to build?
      </div>

      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 164,
          fontWeight: 900,
          color: COLORS.primary,
          letterSpacing: -4,
          lineHeight: 0.9,
          opacity: wordmarkProgress,
          transform: `scale(${interpolate(wordmarkProgress, [0, 1], [0.85, 1])})`,
        }}
      >
        UBLOQUITY
      </div>

      <div
        style={{
          marginTop: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          opacity: urlProgress,
        }}
      >
        <div
          style={{width: 80, height: 3, backgroundColor: COLORS.accent, borderRadius: 2}}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 500,
            color: COLORS.accent,
            letterSpacing: 2,
          }}
        >
          ubloquity.io
        </div>
        <div
          style={{width: 80, height: 3, backgroundColor: COLORS.accent, borderRadius: 2}}
        />
      </div>

      <div
        style={{
          marginTop: 48,
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          color: COLORS.muted,
          opacity: taglineOpacity,
          letterSpacing: 1,
        }}
      >
        Digital agency for the ambitious.
      </div>
    </AbsoluteFill>
  );
};
