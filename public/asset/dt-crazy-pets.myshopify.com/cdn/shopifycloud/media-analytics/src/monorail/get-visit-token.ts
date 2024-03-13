import { IWindow } from '../types';

export default function getVisitToken() {
  try {
    return (<IWindow>(<any>window)).ShopifyAnalytics.lib.trekkie
      .defaultAttributes.visitToken;
  } catch (_error) {
    return null;
  }
}
