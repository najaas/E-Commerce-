import createTimeline from './create-timeline';
import {
  TrackProgressDefinition,
  TrackCanPlayDefinition,
  TrackCreated,
} from './monorail';

type StartTrackingArgs = {
  video: HTMLVideoElement;
  trackProgress: TrackProgressDefinition;
  trackCanPlay: TrackCanPlayDefinition;
  trackCreated: TrackCreated;
};

export const EMIT_PROGRESS_INTERVAL_BACKOFF = [1000, 2000, 3000, 5000, 7000];
export const HAVE_FUTURE_DATA = 3;

const EVENT_PROGRESS = 'progress';
const EVENT_CAN_PLAY = 'canplay';

const canTrack = true;
const videoType = 'html_video';
const shopifyCDN = 'cdn.shopify.com/videos';

let nextSessionVideoId = 0;

export default function startTracking({
  video,
  trackCreated,
  trackCanPlay,
  trackProgress,
}: StartTrackingArgs) {
  const sessionVideoId = nextSessionVideoId++;
  let loadStartTime;
  let lastProgressEmit = -1;
  let lastEmitTime = -1;
  let progressEmitCount = 0;
  let timeline;

  function skipEmitProgress(): Boolean {
    const backoffCount = EMIT_PROGRESS_INTERVAL_BACKOFF.length;
    const backoffPosition = Math.min(progressEmitCount, backoffCount - 1);
    const shouldEmit =
      Date.now() - lastProgressEmit <
      EMIT_PROGRESS_INTERVAL_BACKOFF[backoffPosition];
    return shouldEmit;
  }

  function emitProgress(forceEmit = false) {
    if (!timeline) return;
    timeline.addTime(video.currentTime);

    const isAtEnd = video.currentTime >= video.duration;
    if (!isAtEnd && !forceEmit && skipEmitProgress()) {
      return;
    }

    if (lastEmitTime === video.currentTime) {
      return;
    }

    trackProgress({
      currentSrc: video.currentSrc,
      time: video.currentTime,
      duration: video.duration,
      percentageWatched: timeline.percentage,
      sessionVideoId,
      videoType,
    });

    progressEmitCount += 1;
    lastEmitTime = video.currentTime;
    lastProgressEmit = Date.now();

    if (timeline.percentage == 1) {
      video.removeEventListener('timeupdate', emitProgressCallback);
      video.removeEventListener('seeked', timelineSeekCallback);
    }
  }

  function setLoadStartTimeIfNotSet() {
    if (loadStartTime === undefined) {
      loadStartTime = Date.now();
    }
  }

  function onCaptureLoadStartTime() {
    setLoadStartTimeIfNotSet();
    video.removeEventListener(EVENT_PROGRESS, onCaptureLoadStartTime);
  }

  function onCanPlay() {
    setLoadStartTimeIfNotSet();
    timeline = createTimeline(video.duration);
    video.removeEventListener(EVENT_CAN_PLAY, onCanPlay);

    trackCanPlay({
      currentSrc: video.currentSrc,
      timeToCanplay: (Date.now() - loadStartTime) / 1000,
      sessionVideoId,
      videoType,
    });
  }

  if (video.currentSrc) {
    trackCreated({
      currentSrc: video.currentSrc,
      sessionVideoId,
      canTrack,
      videoType,
    });
  } else {
    video.addEventListener('loadstart', () => {
      trackCreated({
        currentSrc: video.currentSrc,
        sessionVideoId,
        canTrack,
        videoType,
      });
    });
  }

  function isShopifyHosted(video: HTMLVideoElement) {
    return video.currentSrc && video.currentSrc.includes(shopifyCDN);
  }

  if (!isShopifyHosted(video)) {
    return;
  }

  function timelineSeekCallback() {
    timeline.seek(video.currentTime);
  }

  video.addEventListener('seeked', timelineSeekCallback);

  function emitProgressCallback() {
    emitProgress();
  }

  video.addEventListener('timeupdate', emitProgressCallback);

  window.addEventListener('beforeunload', () => {
    emitProgress(true);
  });

  if (video.readyState < HAVE_FUTURE_DATA) {
    video.addEventListener(EVENT_PROGRESS, onCaptureLoadStartTime);
    video.addEventListener(EVENT_CAN_PLAY, onCanPlay);
  } else {
    onCaptureLoadStartTime();
    onCanPlay();
  }
}
