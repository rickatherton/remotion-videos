import React from 'react';
import {interpolate} from 'remotion';

const VW = 900;
const VH = 560;

const NODES = [
  {x: 90, y: 168}, {x: 270, y: 56}, {x: 495, y: 112},
  {x: 720, y: 84}, {x: 405, y: 252}, {x: 180, y: 364},
  {x: 630, y: 336}, {x: 360, y: 448}, {x: 810, y: 224},
  {x: 135, y: 494},
];

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,8],[2,4],[1,4],
  [0,5],[4,5],[4,6],[6,8],[5,7],[6,7],[7,9],[5,9],
];

const PACKET_PATH = [9, 7, 6, 8, 3, 2, 1, 0, 5, 4, 2];
const FRAMES_PER_HOP = 20;

interface Props {
  frame: number;
}

export const NetworkNodes: React.FC<Props> = ({frame}) => {
  const totalHops = PACKET_PATH.length - 1;
  const totalPacketFrames = totalHops * FRAMES_PER_HOP;
  const packetFrame = frame % totalPacketFrames;
  const hopIndex = Math.min(Math.floor(packetFrame / FRAMES_PER_HOP), totalHops - 1);
  const hopProgress = (packetFrame - hopIndex * FRAMES_PER_HOP) / FRAMES_PER_HOP;

  const fromNode = NODES[PACKET_PATH[hopIndex]];
  const toNode = NODES[PACKET_PATH[hopIndex + 1]];
  const packetX = fromNode.x + (toNode.x - fromNode.x) * hopProgress;
  const packetY = fromNode.y + (toNode.y - fromNode.y) * hopProgress;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${VW} ${VH}`} style={{overflow: 'visible'}}>
      <defs>
        <filter id="nn-node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nn-pkt-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {EDGES.map(([a, b], i) => {
        const na = NODES[a];
        const nb = NODES[b];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const p = interpolate(frame - i * 7, [0, 25], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        return (
          <line
            key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="rgba(37,99,235,0.35)" strokeWidth={1.5}
            strokeDasharray={len} strokeDashoffset={len * (1 - p)}
          />
        );
      })}

      {NODES.map((node, i) => {
        const p = interpolate(frame - i * 8, [0, 18], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const pulse = (Math.sin(frame / 28 + i * 1.1) * 0.5 + 0.5) * 6;
        return (
          <g key={i} opacity={p}>
            <circle cx={node.x} cy={node.y} r={10 + pulse} fill="rgba(37,99,235,0.12)" />
            <circle cx={node.x} cy={node.y} r={5} fill="#2563EB" filter="url(#nn-node-glow)" />
          </g>
        );
      })}

      {frame > 30 && (
        <g>
          <circle cx={packetX} cy={packetY} r={18} fill="rgba(6,182,212,0.15)" />
          <circle cx={packetX} cy={packetY} r={8} fill="#06B6D4" filter="url(#nn-pkt-glow)" />
        </g>
      )}
    </svg>
  );
};
