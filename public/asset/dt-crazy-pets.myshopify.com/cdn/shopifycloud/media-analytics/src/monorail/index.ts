import { Monorail, RetryMiddleware } from '@shopify/monorail';
import getPageUrl from './get-page-url';
import getResourceInfo from './get-resource-info';
import getShopId from './get-shop-id';
import getUniqToken from './get-uniq-token';
import getVisitToken from './get-visit-token';

export type DefaultMonorailPayload = {
  shopId: number;
  uniqToken: string;
  sessionToken: string;
  resourceType?: string;
  resourceId?: number;
  pageUrl: string;
};

let defaultPayload: DefaultMonorailPayload;

export function getDefaultPayload(): DefaultMonorailPayload {
  if (defaultPayload) {
    return {
      ...defaultPayload,
      pageUrl: getPageUrl(),
    };
  }

  const { resourceId, resourceType } = getResourceInfo();

  defaultPayload = {
    shopId: getShopId(),
    uniqToken: getUniqToken(),
    sessionToken: getVisitToken(),
    pageUrl: getPageUrl(),
    resourceType,
    resourceId,
  };

  return defaultPayload;
}

let producer: Monorail;

if (process.env.NODE_ENV === 'production') {
  producer = Monorail.createHttpProducer({
    production: true,
    middleware: [new RetryMiddleware(5, 200)],
  });
} else {
  producer = Monorail.createLogProducer({
    debugMode: process.env.NODE_ENV !== 'testing',
  });
}

export default producer;
