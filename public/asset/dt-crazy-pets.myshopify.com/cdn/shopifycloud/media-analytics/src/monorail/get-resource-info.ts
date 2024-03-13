import { IWindow } from '../types';

export type ResourceInfo = {
  resourceType: string;
  resourceId: number;
};

function getPageMeta(): ResourceInfo {
  try {
    return (<IWindow>(<any>window)).ShopifyAnalytics.meta.page;
  } catch (_error) {
    return null;
  }
}

export default function getResourceInfo(): ResourceInfo {
  const { resourceType = null, resourceId = null } = getPageMeta() || {};

  return {
    resourceType,
    resourceId,
  };
}
