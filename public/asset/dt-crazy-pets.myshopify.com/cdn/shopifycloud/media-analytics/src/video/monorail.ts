import monorail, { getDefaultPayload } from '../monorail';
import { VIDEO_CREATED, VIDEO_CAN_PLAY, VIDEO_PROGRESS } from '../schemas';

interface VideoBaseInfo {
  currentSrc: string;
  sessionVideoId: number;
  videoType: string;
}

export interface VideoCreatedInfo extends VideoBaseInfo {
  canTrack: boolean;
}

interface VideoProgressInfo extends VideoBaseInfo {
  time: number;
  duration: number;
  percentageWatched: number;
}

interface VideoCanPlayInfo extends VideoBaseInfo {
  timeToCanplay: number;
}

export type TrackProgressDefinition = (info: VideoProgressInfo) => Promise<any>;
export type TrackCanPlayDefinition = (info: VideoCanPlayInfo) => Promise<any>;
export type TrackCreated = (info: VideoCreatedInfo) => Promise<any>;

type MonorailVideo = {
  trackCreated: TrackCreated;
  trackCanPlay: TrackCanPlayDefinition;
  trackProgress: TrackProgressDefinition;
};

const monorailVideo: MonorailVideo = {
  trackCreated(info: VideoCreatedInfo): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: VIDEO_CREATED,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },

  trackCanPlay(info: VideoCanPlayInfo): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: VIDEO_CAN_PLAY,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },

  trackProgress(info: VideoProgressInfo): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: VIDEO_PROGRESS,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },
};

export default monorailVideo;
