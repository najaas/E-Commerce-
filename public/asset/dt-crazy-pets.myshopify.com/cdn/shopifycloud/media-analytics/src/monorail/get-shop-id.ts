let shopId = null;

const querySelector = 'script#shopify-features[type="application/json"]';

export default function getShopId(): number {
  if (!shopId) {
    const scriptTag =
      document.head.querySelector(querySelector) ||
      document.querySelector(querySelector);

    if (!scriptTag) {
      return null;
    }

    shopId = JSON.parse(scriptTag.innerHTML).shopId;
  }

  return shopId;
}
