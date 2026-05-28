import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SceneCTA} from './scenes/SceneCTA';
import {SceneHook} from './scenes/SceneHook';
import {SceneIntro} from './scenes/SceneIntro';
import {ScenePillars} from './scenes/ScenePillars';

// 30s @ 30fps = 900 frames
// Scene 1: Intro       frames   0 –  89  (3s)
// Scene 2: Hook        frames  90 – 359  (9s)
// Scene 3: Pillars     frames 360 – 659 (10s)
// Scene 4: CTA         frames 660 – 899  (8s)
export const MarketingVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
      <Sequence from={0} durationInFrames={90}>
        <SceneIntro />
      </Sequence>
      <Sequence from={90} durationInFrames={270}>
        <SceneHook />
      </Sequence>
      <Sequence from={360} durationInFrames={300}>
        <ScenePillars />
      </Sequence>
      <Sequence from={660} durationInFrames={240}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
