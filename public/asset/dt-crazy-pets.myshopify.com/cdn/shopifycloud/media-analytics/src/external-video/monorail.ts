import monorail, { getDefaultPayload } from '../monorail';
import { VideoCreatedInfo } from '../video/monorail';
import { VIDEO_CREATED } from '../schemas';

export type TrackCreated = (info: VideoCreatedInfo) => Promise<any>;

type MonorailExternalVideo = {
  trackCreated: TrackCreated;
};

const monorailExternalVideo: MonorailExternalVideo = {
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
};

export default monorailExternalVideo;
