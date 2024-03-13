import { IWindow } from './types';

interface NonStandardDocument extends Document {
  attachEvent(type: string, listener: Function): void;
}

function domReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    (<NonStandardDocument>(<any>document)).attachEvent(
      'onreadystatechange',
      () => {
        if (document.readyState !== 'loading') {
          fn();
        }
      }
    );
  }
}

export default function ready(fn) {
  domReady(() => {
    const ShopifyAnalytics = (<IWindow>(<any>window)).ShopifyAnalytics;

    if (ShopifyAnalytics && ShopifyAnalytics.lib) {
      ShopifyAnalytics.lib.ready(() => {
        fn();
      });
    } else if (process.env.NODE_ENV === 'development') {
      fn();
    }
  });
}
