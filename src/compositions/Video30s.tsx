import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene01Hook} from '../scenes/truth/Scene01Hook';
import {Scene02Breadth} from '../scenes/truth/Scene02Breadth';
import {Scene03Visibility} from '../scenes/truth/Scene03Visibility';
import {Scene04CTA} from '../scenes/truth/Scene04CTA';

// 30s @ 30fps = 900 frames
// Scene01 Hook        :   0 – 209  (7s = 210f)
// Scene02 Breadth     : 210 – 479  (9s = 270f)
// Scene03 Visibility  : 480 – 719  (8s = 240f)
// Scene04 CTA         : 720 – 899  (6s = 180f)
export const Video30s: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050A14'}}>
      <Sequence from={0} durationInFrames={210}><Scene01Hook /></Sequence>
      <Sequence from={210} durationInFrames={270}><Scene02Breadth /></Sequence>
      <Sequence from={480} durationInFrames={240}><Scene03Visibility /></Sequence>
      <Sequence from={720} durationInFrames={180}><Scene04CTA /></Sequence>
    </AbsoluteFill>
  );
};
