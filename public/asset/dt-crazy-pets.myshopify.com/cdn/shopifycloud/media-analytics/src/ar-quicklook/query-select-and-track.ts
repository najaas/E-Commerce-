import findAndCacheElement from '../find-and-cache-element';
import startTrackingAnchor from '../anchor-ar/start-tracking';

const querySelectorToTrack = 'a[rel="ar"]';

export default function querySelectAndTrack() {
  findAndCacheElement(querySelectorToTrack, (anchor: HTMLAnchorElement) => {
    startTrackingAnchor({
      anchor,
      arElementType: 'ar_quicklook',
    });
  });
}
