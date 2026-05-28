import React from 'react';
import {interpolate} from 'remotion';

interface Props {
  frame: number;
}

// Major trade hubs [x, y] in viewBox 0 0 800 420
const HUBS: Record<string, [number, number]> = {
  'Los Angeles':  [85,  185],
  'New York':     [195, 155],
  'Rotterdam':    [444, 108],
  'London':       [424,  98],
  'Dubai':        [588, 205],
  'Mumbai':       [638, 228],
  'Singapore':    [720, 278],
  'Shanghai':     [748, 182],
  'Cape Town':    [475, 345],
  'Sydney':       [790, 318],
};

const HUB_LIST = Object.entries(HUBS);

// Route: Shanghai → Dubai → Rotterdam (the main animation)
const ROUTE_NODES: Array<[number,number]> = [
  HUBS['Shanghai'],
  HUBS['Singapore'],
  HUBS['Mumbai'],
  HUBS['Dubai'],
  HUBS['Rotterdam'],
];

// Build polyline points for the route
const ROUTE_LEN = ROUTE_NODES.reduce((acc, node, i) => {
  if (i === 0) return 0;
  const prev = ROUTE_NODES[i - 1];
  return acc + Math.hypot(node[0] - prev[0], node[1] - prev[1]);
}, 0);

export const GlobalTradeMap: React.FC<Props> = ({frame}) => {
  // Route draw progress
  const routeProgress = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Hub reveal
  const hubsVisible = Math.min(Math.floor(frame / 6), HUB_LIST.length);

  const routePoints = ROUTE_NODES.map(([x, y]) => `${x},${y}`).join(' ');
  const totalDash = ROUTE_LEN + 20;

  return (
    <svg width="100%" height="100%" viewBox="0 0 800 420" style={{overflow: 'visible'}}>
      <defs>
        <filter id="gtm-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gtm-hub-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {[0.2, 0.4, 0.6, 0.8].map(t => (
        <g key={t}>
          <line x1={0} y1={t * 420} x2={800} y2={t * 420}
            stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
          <line x1={t * 800} y1={0} x2={t * 800} y2={420}
            stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        </g>
      ))}

      {/* Route (dashed background) */}
      <polyline
        points={routePoints}
        fill="none"
        stroke="rgba(37,99,235,0.15)"
        strokeWidth={2}
        strokeDasharray="6 6"
      />

      {/* Route animated draw (green lane) */}
      <polyline
        points={routePoints}
        fill="none"
        stroke="#10B981"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={totalDash}
        strokeDashoffset={totalDash * (1 - routeProgress)}
        filter="url(#gtm-glow)"
      />

      {/* Hubs */}
      {HUB_LIST.slice(0, hubsVisible).map(([name, [x, y]], i) => {
        const onRoute = ROUTE_NODES.some(([rx, ry]) => rx === x && ry === y);
        const pulse = Math.sin(frame / 22 + i * 0.9) * 0.5 + 0.5;
        const color = onRoute ? '#10B981' : '#2563EB';
        return (
          <g key={name}>
            <circle cx={x} cy={y} r={10 + pulse * 5} fill={`${color}20`} />
            <circle cx={x} cy={y} r={5} fill={color} filter="url(#gtm-hub-glow)" />
            <text x={x + 10} y={y + 4} fill="rgba(255,255,255,0.7)"
              fontSize={11} fontFamily="sans-serif">{name}</text>
          </g>
        );
      })}

      {/* Moving ship dot along route */}
      {frame > 30 && (() => {
        const travelled = routeProgress * ROUTE_LEN;
        let acc = 0;
        let shipX = ROUTE_NODES[0][0];
        let shipY = ROUTE_NODES[0][1];
        for (let i = 1; i < ROUTE_NODES.length; i++) {
          const prev = ROUTE_NODES[i - 1];
          const curr = ROUTE_NODES[i];
          const seg = Math.hypot(curr[0] - prev[0], curr[1] - prev[1]);
          if (acc + seg >= travelled) {
            const t = (travelled - acc) / seg;
            shipX = prev[0] + (curr[0] - prev[0]) * t;
            shipY = prev[1] + (curr[1] - prev[1]) * t;
            break;
          }
          acc += seg;
        }
        return (
          <g>
            <circle cx={shipX} cy={shipY} r={16} fill="rgba(16,185,129,0.2)" />
            <circle cx={shipX} cy={shipY} r={8} fill="#10B981" filter="url(#gtm-glow)" />
          </g>
        );
      })()}
    </svg>
  );
};
