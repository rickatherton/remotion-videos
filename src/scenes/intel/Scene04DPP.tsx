import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {QRCodeAnim} from '../../components/QRCodeAnim';
import {FONT, TC} from '../../lib/techTheme';

const DPP_FIELDS = [
  {label: 'Product ID', value: 'UBQ-2025-DPP-88219'},
  {label: 'Origin', value: 'Factory DE-7 · Munich'},
  {label: 'Carbon Footprint', value: '2.4 kg CO₂e'},
  {label: 'Compliance', value: 'EU DPP / EUDR / CBAM'},
  {label: 'Owner', value: '0x4a2c…f891'},
];

export const Scene04DPP: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const labelP = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const headlineP = spring({
    frame: frame - 20, fps,
    config: {damping: 20, stiffness: 130},
  });

  const cardP = spring({
    frame: frame - 45, fps,
    config: {damping: 22, stiffness: 140},
  });

  const rotate = interpolate(frame, [0, 300], [0, 12], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: TC.bg, opacity: fadeIn,
      display: 'flex', alignItems: 'center',
      padding: '0 140px', gap: 80,
    }}>
      {/* Left: copy */}
      <div style={{flex: 1.2}}>
        <div style={{
          fontFamily: FONT, fontSize: 18, fontWeight: 600,
          color: TC.cyan, letterSpacing: 4, textTransform: 'uppercase',
          opacity: labelP, marginBottom: 28,
        }}>
          Did you know?
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 62, fontWeight: 800,
          color: TC.primary, lineHeight: 1.1, letterSpacing: -1.5,
          opacity: headlineP,
          transform: `translateY(${(1 - headlineP) * 30}px)`,
          marginBottom: 36,
        }}>
          A tamper-proof<br />
          digital identity<br />
          <span style={{color: TC.accent}}>that stays for life.</span>
        </div>

        <div style={{
          fontFamily: FONT, fontSize: 24, color: TC.muted,
          lineHeight: 1.6, opacity: headlineP, maxWidth: 520,
        }}>
          The Digital Product Passport follows every asset from manufacture
          to end-of-life — readable by anyone, alterable by no one.
        </div>
      </div>

      {/* Right: DPP card + QR */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 28,
        opacity: cardP,
        transform: `translateY(${(1 - cardP) * 40}px) rotate(${rotate}deg)`,
      }}>
        {/* DPP card */}
        <div style={{
          width: '100%',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.08))',
          border: `1px solid rgba(37,99,235,0.4)`,
          borderRadius: 20,
          padding: '28px 32px',
          boxShadow: '0 0 60px rgba(37,99,235,0.2)',
        }}>
          <div style={{
            fontFamily: FONT, fontSize: 13, fontWeight: 700,
            color: TC.accent, letterSpacing: 3, marginBottom: 20,
          }}>
            DIGITAL PRODUCT PASSPORT
          </div>

          {DPP_FIELDS.map(({label, value}, i) => {
            const p = interpolate(frame - 60 - i * 14, [0, 20], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: `1px solid ${TC.border}`,
                opacity: p,
              }}>
                <span style={{fontFamily: FONT, fontSize: 14, color: TC.muted}}>{label}</span>
                <span style={{fontFamily: 'monospace', fontSize: 14, color: TC.cyan}}>{value}</span>
              </div>
            );
          })}
        </div>

        <QRCodeAnim frame={Math.max(0, frame - 80)} size={200} />
      </div>
    </AbsoluteFill>
  );
};
