import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {DataLedger} from '../../components/DataLedger';
import {FONT, TC} from '../../lib/techTheme';

const SENSOR_READINGS = ['TEMP: 4.2°C', 'HUM: 62%', 'LOC: 51.50°N', 'ALT: 340m', 'SHOCK: 0.0g'];

export const Scene03IoTESG: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelP = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const headlineP = interpolate(frame, [25, 60], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const dividerP = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 140px',
    }}>
      <div style={{
        fontFamily: FONT, fontSize: 18, fontWeight: 600,
        color: TC.green, letterSpacing: 4, textTransform: 'uppercase',
        opacity: labelP, marginBottom: 24,
        alignSelf: 'flex-start',
      }}>
        IoT Integrity & ESG
      </div>

      <div style={{
        fontFamily: FONT, fontSize: 60, fontWeight: 800,
        color: TC.primary, lineHeight: 1.1, letterSpacing: -1,
        opacity: headlineP,
        transform: `translateY(${(1 - headlineP) * 25}px)`,
        marginBottom: 48, alignSelf: 'flex-start',
        maxWidth: 900,
      }}>
        IoT data stored immutably.<br />
        <span style={{color: TC.green}}>Audit-ready by design.</span>
      </div>

      {/* Split: sensor readings left, ledger right */}
      <div style={{display: 'flex', gap: 60, width: '100%', alignItems: 'flex-start'}}>

        {/* Left: sensor visual */}
        <div style={{
          flex: 1, background: TC.card,
          border: `1px solid ${TC.border}`, borderRadius: 16,
          padding: '32px 36px',
        }}>
          <div style={{
            fontFamily: FONT, fontSize: 14, fontWeight: 600,
            color: TC.cyan, letterSpacing: 3, marginBottom: 20,
          }}>
            LIVE SENSOR STREAM
          </div>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: TC.green,
            boxShadow: `0 0 12px ${TC.green}`,
            display: 'inline-block', marginRight: 8, marginBottom: 24,
          }} />
          <span style={{fontFamily: FONT, fontSize: 13, color: TC.muted}}>
            ACTIVE — Asset #UBQ-8821-C
          </span>

          {SENSOR_READINGS.map((reading, i) => {
            const p = interpolate(frame - 60 - i * 15, [0, 20], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <div key={reading} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: `1px solid ${TC.border}`,
                opacity: p,
                transform: `translateX(${(1 - p) * 20}px)`,
              }}>
                <span style={{fontFamily: 'monospace', fontSize: 14, color: TC.muted}}>
                  {reading.split(':')[0]}
                </span>
                <span style={{fontFamily: 'monospace', fontSize: 15, color: TC.cyan, fontWeight: 700}}>
                  {reading.split(':')[1]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, paddingTop: 48,
        }}>
          <div style={{
            width: 2, height: dividerP * 200,
            background: `linear-gradient(to bottom, ${TC.cyan}, ${TC.accent})`,
          }} />
          <div style={{
            fontFamily: 'monospace', fontSize: 11, color: TC.muted,
            writingMode: 'vertical-rl' as const, opacity: dividerP,
          }}>
            WRITES TO CHAIN
          </div>
        </div>

        {/* Right: immutable ledger */}
        <div style={{flex: 1.2}}>
          <div style={{
            fontFamily: FONT, fontSize: 14, fontWeight: 600,
            color: TC.accent, letterSpacing: 3, marginBottom: 20,
          }}>
            IMMUTABLE LEDGER
          </div>
          <DataLedger frame={Math.max(0, frame - 40)} count={5} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
