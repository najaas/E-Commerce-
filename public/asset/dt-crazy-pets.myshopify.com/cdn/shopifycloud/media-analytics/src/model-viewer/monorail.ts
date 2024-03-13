import monorail, { getDefaultPayload } from '../monorail';
import {
  MODEL_VIEWER_CREATED,
  MODEL_VIEWER_LOADED,
  MODEL_VIEWER_FAILED,
  MODEL_VIEWER_INTERACT,
} from '../schemas';

interface ModelViewerBaseInfo {
  src: string;
  sessionModelViewerId: number;
}

interface ModelViewerCreated extends ModelViewerBaseInfo {
  iosSrc: string;
}

interface ModelViewerLoaded extends ModelViewerBaseInfo {
  timeToLoaded: number;
}

interface ModelViewerFailed extends ModelViewerBaseInfo {
  type: string;
}

export type TrackCreated = (info: ModelViewerCreated) => Promise<any>;
export type TrackLoaded = (info: ModelViewerLoaded) => Promise<any>;
export type TrackFailed = (info: ModelViewerFailed) => Promise<any>;
export type TrackInteract = (info: ModelViewerBaseInfo) => Promise<any>;

type MonorailModelViewer = {
  trackCreated: TrackCreated;
  trackLoaded: TrackLoaded;
  trackFailed: TrackFailed;
  trackInteract: TrackInteract;
};

const monorailModelViewer: MonorailModelViewer = {
  trackCreated(info: ModelViewerCreated): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: MODEL_VIEWER_CREATED,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },

  trackLoaded(info: ModelViewerLoaded): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: MODEL_VIEWER_LOADED,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },

  trackFailed(info: ModelViewerFailed): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: MODEL_VIEWER_FAILED,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },

  trackInteract(info: ModelViewerBaseInfo): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: MODEL_VIEWER_INTERACT,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },
};

export default monorailModelViewer;
