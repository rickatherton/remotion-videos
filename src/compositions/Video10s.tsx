import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene01QR} from '../scenes/hook/Scene01QR';
import {Scene02Blockchain} from '../scenes/hook/Scene02Blockchain';
import {Scene03Logo} from '../scenes/hook/Scene03Logo';

// 10s @ 30fps = 300 frames
// Scene01 QR         :   0 –  89  (3s = 90f)
// Scene02 Blockchain :  90 – 209  (4s = 120f)
// Scene03 Logo       : 210 – 299  (3s = 90f)
export const Video10s: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050A14'}}>
      <Sequence from={0} durationInFrames={90}><Scene01QR /></Sequence>
      <Sequence from={90} durationInFrames={120}><Scene02Blockchain /></Sequence>
      <Sequence from={210} durationInFrames={90}><Scene03Logo /></Sequence>
    </AbsoluteFill>
  );
};
