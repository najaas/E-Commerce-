import {
  TrackCreated,
  TrackLoaded,
  TrackFailed,
  TrackInteract,
} from './monorail';

export interface ModelViewerElement extends HTMLElement {
  src: string;
  iosSrc: string;
}

export type ModelViewerFailureEventType = 'loadfailure' | 'webglcontextlost';
export type ModelViewerUserInteractType = 'none' | 'user-interaction';

interface ModelViewerFailureEvent extends ErrorEvent {
  detail: {
    type: ModelViewerFailureEventType;
  };
}

interface ModelViewerCameraChangeEvent extends Event {
  detail: {
    source: ModelViewerUserInteractType;
  };
}

export type StartTrackingArgs = {
  modelViewer: ModelViewerElement;
  trackCreated: TrackCreated;
  trackLoaded: TrackLoaded;
  trackFailed: TrackFailed;
  trackInteract: TrackInteract;
};

let nextSessionModelViewerId = 0;

export default function startTracking({
  modelViewer,
  trackCreated,
  trackLoaded,
  trackFailed,
  trackInteract,
}: StartTrackingArgs) {
  const sessionModelViewerId = nextSessionModelViewerId++;
  let src = modelViewer.src || '';
  let iosSrc = modelViewer.iosSrc;
  let loadStartTime = Date.now();
  let hasInteracted = false;

  function onProgress() {
    if (modelViewer.src !== src) {
      src = modelViewer.src || '';
      hasInteracted = false;
      loadStartTime = Date.now();
    }
  }

  function onLoad() {
    trackLoaded({
      sessionModelViewerId,
      src,
      timeToLoaded: (Date.now() - loadStartTime) / 1000,
    });
  }

  function onError(event: ModelViewerFailureEvent) {
    const type = event.detail.type;

    trackFailed({
      sessionModelViewerId,
      src,
      type,
    });
  }

  function onCameraChange(event: ModelViewerCameraChangeEvent) {
    if (hasInteracted) {
      return;
    }

    if (event.detail.source !== 'user-interaction') {
      return;
    }

    hasInteracted = true;

    trackInteract({
      sessionModelViewerId,
      src,
    });
  }

  trackCreated({
    sessionModelViewerId,
    src,
    iosSrc,
  });

  modelViewer.addEventListener('load', onLoad);
  modelViewer.addEventListener('error', onError);
  modelViewer.addEventListener('camera-change', onCameraChange);
  modelViewer.addEventListener('progress', onProgress);
}
