import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BlockchainShield} from '../../components/BlockchainShield';
import {FONT, TC} from '../../lib/techTheme';

export const Scene02Blockchain: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const h1P = interpolate(frame, [15, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const h2P = spring({frame: frame - 35, fps, config: {damping: 18, stiffness: 150}});

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', alignItems: 'center',
      padding: '0 140px', gap: 80,
    }}>
      <div style={{flex: 1}}>
        <div style={{
          fontFamily: FONT, fontSize: 24, fontWeight: 600,
          color: TC.cyan, letterSpacing: 3, textTransform: 'uppercase',
          opacity: h1P, marginBottom: 24,
        }}>
          Private Blockchain
        </div>
        <div style={{
          fontFamily: FONT, fontSize: 82, fontWeight: 900,
          color: TC.primary, letterSpacing: -2.5, lineHeight: 0.95,
          opacity: h2P,
          transform: `translateY(${(1 - h2P) * 30}px)`,
        }}>
          Peerless<br />
          <span style={{color: TC.accent}}>Trust.</span>
        </div>
      </div>

      <div style={{flexShrink: 0}}>
        <BlockchainShield frame={frame} fps={fps} />
      </div>
    </AbsoluteFill>
  );
};
