import Segment from './segment';

type Timeline = {
  readonly percentage: number;
  seek(time: number);
  addTime(time: number);
};

export default function timeline(videoDuration: number): Timeline {
  const segments: Segment[] = [new Segment({ videoDuration, startTime: 0 })];
  let currentSegment: Segment = segments[0];

  function getSegmentForTime(time: number) {
    // note not using segments.find here because we don't want to
    // polyfill the find function and increase file size
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].isTimeInSegment(time)) {
        return segments[i];
      }
    }

    return null;
  }

  function combineSegments(segment1: Segment, segment2: Segment): Segment {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i] === segment1 || segments[i] === segment2) {
        segments.splice(i, 1);
      }
    }

    const startTime =
      segment1.startTime < segment2.startTime
        ? segment1.startTime
        : segment2.startTime;
    const endTime =
      segment1.endTime > segment2.endTime ? segment1.endTime : segment2.endTime;
    const newSegment = new Segment({ videoDuration, startTime, endTime });

    segments.push(newSegment);

    return newSegment;
  }

  return {
    get percentage() {
      if (segments.length === 0) {
        return 0;
      }

      return segments.reduce((total, segment) => {
        return total + segment.percentage;
      }, 0);
    },

    seek(time: number) {
      let segmentForTime = getSegmentForTime(time);

      if (!segmentForTime) {
        currentSegment = new Segment({ videoDuration, startTime: time });
        segments.push(currentSegment);
        return;
      }

      currentSegment = segmentForTime;
    },

    addTime(time: number) {
      let segmentForTime = getSegmentForTime(time);

      if (segmentForTime && segmentForTime !== currentSegment) {
        currentSegment = combineSegments(segmentForTime, currentSegment);
      }

      currentSegment.extendSegment(time);
    },
  };
}
