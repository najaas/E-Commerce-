const elementsTracking = [];

export type FoundElementCallback = (element: HTMLElement) => void;

export function getCacheIndexOfElement(element: HTMLElement): number {
  return elementsTracking.indexOf(element);
}

export default function findAndCacheElement(
  querySelector: string,
  callback: FoundElementCallback
) {
  const elements: HTMLElement[] = Array.prototype.slice.apply(
    document.querySelectorAll(querySelector)
  );

  elements.forEach((element) => {
    if (elementsTracking.indexOf(element) !== -1) {
      return;
    }

    elementsTracking.push(element);

    callback(element);
  });
}
