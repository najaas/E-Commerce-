import { IWindow } from '../types';

export default function getUniqToken() {
  try {
    return (<IWindow>(<any>window)).ShopifyAnalytics.lib.user().traits()
      .uniqToken;
  } catch (_error) {
    return null;
  }
}
