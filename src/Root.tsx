import React from 'react';
import {Composition} from 'remotion';
import {Video10s} from './compositions/Video10s';
import {Video30s} from './compositions/Video30s';
import {Video60s} from './compositions/Video60s';
import {MarketingVideo} from './MarketingVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original brand video */}
      <Composition
        id="MarketingVideo"
        component={MarketingVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* "The Intelligence of Trust" — 60s */}
      <Composition
        id="IntelligenceOfTrust"
        component={Video60s}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* "The Single Version of Truth" — 30s */}
      <Composition
        id="SingleVersionOfTruth"
        component={Video30s}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* "The Scroll Stopper" — 10s hook */}
      <Composition
        id="ScrollStopper"
        component={Video10s}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
