import { VIDEO_TYPE } from './youtube-constants';
import querySelectAndTrackExternal from '../external-video/query-select-and-track';
import urlContainsJsApi from './url-contains-js-api';

const querySelector = 'iframe[src^="https://www.youtube.com/embed/"]';

export default function querySelectAndTrack() {
  querySelectAndTrackExternal({
    querySelector,
    videoType: VIDEO_TYPE,
    determineCanTrack(iframe) {
      return urlContainsJsApi(iframe.src);
    },
  });
}
