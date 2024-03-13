import monorail, { getDefaultPayload } from '..';
import { AR_CREATED, AR_INVOKED } from '../../schemas';

interface ARBase {
  src: string;
  sessionSourceId: number;
}

type ARElementType = 'ar_quicklook' | 'scene_viewer' | 'shopify_xr';

interface ARCreated extends ARBase {
  arElementType: ARElementType;
}

type InvokerType = 'html_anchor' | 'shopify_xr';
export type ARType = 'ar_quicklook' | 'scene_viewer';

interface ARInvoked extends ARBase {
  invoker: InvokerType;
  arType: ARType;
}

export type TrackCreated = (info: ARCreated) => Promise<any>;
export type TrackInvoke = (info: ARInvoked) => Promise<any>;

type MonorailAR = {
  trackCreated: TrackCreated;
  trackInvoke: TrackInvoke;
};

const monorailAR: MonorailAR = {
  trackCreated(info: ARCreated): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: AR_CREATED,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },

  trackInvoke(info: ARInvoked): Promise<any> {
    const defaultPayload = getDefaultPayload();

    return monorail.produce({
      schemaId: AR_INVOKED,
      payload: {
        ...defaultPayload,
        ...info,
      },
    });
  },
};

export default monorailAR;
