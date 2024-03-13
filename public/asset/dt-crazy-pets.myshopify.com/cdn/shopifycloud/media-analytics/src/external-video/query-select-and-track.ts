import monorail from './monorail';
import findAndCacheElement from '../find-and-cache-element';
import startTracking from './start-tracking';

interface QuerySelectAndTrackArgs {
  videoType: string;
  querySelector: string;
  determineCanTrack?: (video: HTMLIFrameElement) => boolean;
}

export default function querySelectAndTrack({
  videoType,
  querySelector,
  determineCanTrack,
}: QuerySelectAndTrackArgs) {
  findAndCacheElement(querySelector, (element: HTMLElement) => {
    const videoIframe = element as HTMLIFrameElement;

    let canTrack = true;

    if (determineCanTrack) {
      canTrack = determineCanTrack(videoIframe);
    }

    startTracking({
      videoType,
      videoIframe,
      canTrack,
      ...monorail,
    });
  });
}
