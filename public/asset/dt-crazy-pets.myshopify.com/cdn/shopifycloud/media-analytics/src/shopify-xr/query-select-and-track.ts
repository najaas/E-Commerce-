import findAndCacheElement, {
  getCacheIndexOfElement,
} from '../find-and-cache-element';
import monorail, { ARType } from '../monorail/ar';

const { trackCreated, trackInvoke } = monorail;

export type ShopifyXRMode = 'ar_quicklook' | 'scene_viewer' | 'not_supported';
export type ShopifyXRLaunchEventPayload = {
  element: HTMLElement;
  xrMode: ShopifyXRMode;
  srcUrl: string;
};
export type ShopifyXRLaunchEvent = CustomEvent<ShopifyXRLaunchEventPayload>;

export const SHOPIFY_XR_LAUNCH_EVENT_TYPE = 'shopify_xr_launch';

export type ShopifyXREnabledEventPayload = {
  element: HTMLElement;
};
export type ShopifyXREnabledEvent = CustomEvent<ShopifyXREnabledEventPayload>;

export const SHOPIFY_XR_ENABLED_EVENT_TYPE = 'shopify_xr_enabled';

const arElementType = 'shopify_xr';
const invoker = 'shopify_xr';
const querySelectorToTrack = '[data-shopify-xr]:not([data-shopify-xr-hidden])';
const hiddenAttribute = 'data-shopify-xr-hidden';

const findAndCacheXrElements = function () {
  findAndCacheElement(querySelectorToTrack, (element: HTMLElement) => {
    if (element.hasAttribute(hiddenAttribute)) {
      return;
    }
    trackCreated({
      arElementType,
      sessionSourceId: getCacheIndexOfElement(element),
      src: 'unknown',
    });
  });
};

document.addEventListener(
  SHOPIFY_XR_LAUNCH_EVENT_TYPE,
  (event: ShopifyXRLaunchEvent) => {
    const { xrMode, srcUrl: src, element } = event.detail;
    let sessionSourceId = null;

    if (xrMode === 'not_supported') {
      return;
    }

    if (element) {
      sessionSourceId = getCacheIndexOfElement(element);
    }

    // an element we've never seen
    // we will just ignore these for now since the other
    // 3d Monorail events ignore all newly created events outside
    // of the original load + query
    if (sessionSourceId === -1) {
      return;
    }

    trackInvoke({
      arType: xrMode,
      invoker,
      sessionSourceId,
      src,
    });
  }
);

document.addEventListener(
  SHOPIFY_XR_ENABLED_EVENT_TYPE,
  (event: ShopifyXREnabledEvent) => {
    findAndCacheXrElements();
  }
);

export default function querySelectAndTrack() {
  findAndCacheXrElements();
}
