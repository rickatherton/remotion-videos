import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {DataLedger} from '../../components/DataLedger';
import {GlobalTradeMap} from '../../components/GlobalTradeMap';
import {FONT, TC} from '../../lib/techTheme';

export const Scene03Visibility: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelP = interpolate(frame, [8, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const headP = interpolate(frame, [22, 58], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const badgeP = interpolate(frame, [70, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', flexDirection: 'column',
      padding: '50px 140px',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 18, fontWeight: 600,
        color: TC.cyan, letterSpacing: 4, textTransform: 'uppercase',
        opacity: labelP, marginBottom: 16,
      }}>
        Single pane of glass
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 56, fontWeight: 800,
        color: TC.primary, lineHeight: 1.1, letterSpacing: -1.5,
        opacity: headP, transform: `translateY(${(1 - headP) * 20}px)`,
        marginBottom: 36,
      }}>
        Secure IoT · Real-time visibility ·{' '}
        <span style={{color: TC.green}}>Immutable trust.</span>
      </div>

      <div style={{display: 'flex', gap: 40, flex: 1, alignItems: 'flex-start'}}>
        {/* Map */}
        <div style={{
          flex: 1.4,
          background: TC.card, border: `1px solid ${TC.border}`,
          borderRadius: 16, padding: '16px',
          opacity: badgeP,
        }}>
          <div style={{
            fontFamily: FONT, fontSize: 13, fontWeight: 600,
            color: TC.cyan, letterSpacing: 3, marginBottom: 12,
          }}>
            UBIНEX LIVE VIEW
          </div>
          <GlobalTradeMap frame={Math.max(0, frame - 40)} />
        </div>

        {/* Ledger */}
        <div style={{flex: 1}}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 20, opacity: badgeP,
          }}>
            <div style={{
              background: TC.green, borderRadius: 100,
              padding: '6px 18px',
              fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#000',
            }}>
              ✓ VALIDATED
            </div>
            <div style={{fontFamily: FONT, fontSize: 14, color: TC.muted}}>
              Live IoT stream — immutable
            </div>
          </div>
          <DataLedger frame={Math.max(0, frame - 50)} count={4} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
