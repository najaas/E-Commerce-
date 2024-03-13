import monorail from './monorail';
import findAndCacheElement from '../find-and-cache-element';
import startTracking, { ModelViewerElement } from './start-tracking';

const querySelectorToTrack = 'model-viewer';

export default function querySelectAndTrack() {
  findAndCacheElement(
    querySelectorToTrack,
    (modelViewer: ModelViewerElement) => {
      startTracking({
        modelViewer,
        ...monorail,
      });
    }
  );
}
