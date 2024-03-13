import monorail from './monorail';
import findAndCacheElement from '../find-and-cache-element';
import startTracking from './start-tracking';

const querySelectorToTrack = 'video';

export default function querySelectAndTrack() {
  findAndCacheElement(querySelectorToTrack, (video: HTMLVideoElement) => {
    startTracking({
      video,
      ...monorail,
    });
  });
}
