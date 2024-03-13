import findAndCacheElement from '../find-and-cache-element';
import startTrackingAnchor from '../anchor-ar/start-tracking';

const querySelectorToTrack =
  'a[href*="package=com.google.ar.core;action=android.intent.action.VIEW;"]';

export default function querySelectAndTrack() {
  findAndCacheElement(querySelectorToTrack, (anchor: HTMLAnchorElement) => {
    startTrackingAnchor({
      anchor,
      arElementType: 'scene_viewer',
    });
  });
}
