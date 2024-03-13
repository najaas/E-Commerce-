type SegmentArguments = {
  videoDuration: number;
  startTime: number;
  endTime?: number;
};

export default class Segment {
  private videoDuration: number;
  private _startTime: number;
  private _endTime: number;

  constructor({ videoDuration, startTime, endTime }: SegmentArguments) {
    this.videoDuration = videoDuration;
    this._startTime = startTime;
    this._endTime = endTime;

    if (!endTime) {
      this._endTime = startTime;
    }
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get percentage() {
    return (this._endTime - this._startTime) / this.videoDuration;
  }

  isTimeInSegment(time: number): boolean {
    return time >= this._startTime && time <= this._endTime;
  }

  extendSegment(time: number): boolean {
    if (time < this._startTime) {
      this._startTime = time;
      return true;
    }

    if (time > this._endTime) {
      this._endTime = time;
      return true;
    }

    return false;
  }
}
