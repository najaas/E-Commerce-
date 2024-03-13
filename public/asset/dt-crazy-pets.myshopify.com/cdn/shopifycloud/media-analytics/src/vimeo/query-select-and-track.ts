import { VIDEO_TYPE } from './vimeo-constants';
import querySelectAndTrackExternal from '../external-video/query-select-and-track';

const querySelector = 'iframe[src^="https://player.vimeo.com/video/"]';

export default function querySelectAndTrack() {
  querySelectAndTrackExternal({
    querySelector,
    videoType: VIDEO_TYPE,
  });
}
