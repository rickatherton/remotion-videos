import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene01Intro} from '../scenes/intel/Scene01Intro';
import {Scene02SecureData} from '../scenes/intel/Scene02SecureData';
import {Scene03IoTESG} from '../scenes/intel/Scene03IoTESG';
import {Scene04DPP} from '../scenes/intel/Scene04DPP';
import {Scene05ubiNex} from '../scenes/intel/Scene05ubiNex';
import {Scene06Summary} from '../scenes/intel/Scene06Summary';
import {Scene07CTA} from '../scenes/intel/Scene07CTA';

// 60s @ 30fps = 1800 frames
// Scene01 Intro       :    0 –  209  (7s = 210f)
// Scene02 SecureData  :  210 –  509  (10s = 300f)
// Scene03 IoTESG      :  510 –  809  (10s = 300f)
// Scene04 DPP         :  810 – 1109  (10s = 300f)
// Scene05 ubiNex      : 1110 – 1409  (10s = 300f)
// Scene06 Summary     : 1410 – 1619  (7s = 210f)
// Scene07 CTA         : 1620 – 1799  (6s = 180f)
export const Video60s: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050A14'}}>
      <Sequence from={0} durationInFrames={210}><Scene01Intro /></Sequence>
      <Sequence from={210} durationInFrames={300}><Scene02SecureData /></Sequence>
      <Sequence from={510} durationInFrames={300}><Scene03IoTESG /></Sequence>
      <Sequence from={810} durationInFrames={300}><Scene04DPP /></Sequence>
      <Sequence from={1110} durationInFrames={300}><Scene05ubiNex /></Sequence>
      <Sequence from={1410} durationInFrames={210}><Scene06Summary /></Sequence>
      <Sequence from={1620} durationInFrames={180}><Scene07CTA /></Sequence>
    </AbsoluteFill>
  );
};
