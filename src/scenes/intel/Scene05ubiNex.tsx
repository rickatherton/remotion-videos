import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {GlobalTradeMap} from '../../components/GlobalTradeMap';
import {FONT, TC} from '../../lib/techTheme';

const AGENCIES = ['HMRC', 'WCO', 'EUCD', 'CBP', 'CBAM'];

export const Scene05ubiNex: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelP = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const headlineP = interpolate(frame, [25, 65], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const mapP = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: TC.bg, opacity: fadeIn}}>
      {/* Top: headline */}
      <div style={{
        padding: '60px 140px 0',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              fontFamily: FONT, fontSize: 18, fontWeight: 600,
              color: TC.cyan, letterSpacing: 4, textTransform: 'uppercase',
              opacity: labelP, marginBottom: 20,
            }}>
              ubiNex Platform
            </div>
            <div style={{
              fontFamily: FONT, fontSize: 58, fontWeight: 800,
              color: TC.primary, lineHeight: 1.1, letterSpacing: -1.5,
              opacity: headlineP,
              transform: `translateY(${(1 - headlineP) * 25}px)`,
            }}>
              Cross-border visibility,<br />
              <span style={{color: TC.green}}>in real time.</span>
            </div>
          </div>

          {/* Agency badges */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            paddingTop: 8, opacity: headlineP,
          }}>
            {AGENCIES.map((ag, i) => {
              const p = interpolate(frame - 70 - i * 18, [0, 20], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              });
              return (
                <div key={ag} style={{
                  fontFamily: FONT, fontSize: 14, fontWeight: 700,
                  color: TC.green, letterSpacing: 2,
                  padding: '8px 18px',
                  border: `1px solid rgba(16,185,129,0.4)`,
                  borderRadius: 8,
                  background: 'rgba(16,185,129,0.08)',
                  opacity: p,
                  transform: `translateX(${(1 - p) * 30}px)`,
                }}>
                  ✓ {ag}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{
        flex: 1, padding: '24px 100px 48px',
        opacity: mapP,
        transform: `translateY(${(1 - mapP) * 20}px)`,
      }}>
        <GlobalTradeMap frame={Math.max(0, frame - 30)} />
      </div>
    </AbsoluteFill>
  );
};
