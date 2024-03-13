import monorail from '../monorail/ar';

export type StartTrackingArgs = {
  anchor: HTMLAnchorElement;
  arElementType: 'ar_quicklook' | 'scene_viewer';
};

const invoker = 'html_anchor';
const { trackCreated, trackInvoke } = monorail;

let nextSessionSourceId = 0;

export default function startTracking({
  anchor,
  arElementType,
}: StartTrackingArgs) {
  const sessionSourceId = nextSessionSourceId++;
  const src = anchor.href || '';

  function onClick() {
    trackInvoke({
      src,
      sessionSourceId,
      invoker,
      arType: arElementType,
    });
  }

  anchor.addEventListener('click', onClick);

  trackCreated({
    arElementType,
    sessionSourceId,
    src,
  });
}
