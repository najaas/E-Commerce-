import { TrackCreated } from './monorail';

type StartTrackingArgs = {
  videoType: string;
  videoIframe: HTMLIFrameElement;
  trackCreated: TrackCreated;
  canTrack: boolean;
};

let nextSessionId = 0;

export default function startTracking({
  videoType,
  videoIframe,
  trackCreated,
  canTrack,
}: StartTrackingArgs) {
  const sessionVideoId = nextSessionId++;

  trackCreated({
    currentSrc: videoIframe.src,
    sessionVideoId,
    canTrack,
    videoType,
  });
}
