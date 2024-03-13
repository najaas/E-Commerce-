(function () {
  var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
  var scripts = [
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.da42550059190bee04f4.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/922.latest.en.0a02952f03be201cff6a.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/807.latest.en.f5b76add4556abacb226.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/681.latest.en.76291e02a8e10078afd8.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.6981947a2f765cd0968b.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/751.latest.en.08105131cffb5e5f123d.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/21.latest.en.34d1a592e4e4e80d1dc1.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/100.latest.en.ce6eac4958bd25e9d6a6.js",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.83680daab1bf3a2424ab.js",
  ];
  var styles = [
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/922.latest.en.7f073fcd0399772883a4.css",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.5e52d9ec000e6dcd2cd6.css",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/21.latest.en.978411357b08e15f2a5e.css",
    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/268.latest.en.6520a112d0e27cf11401.css",
  ];
  var fontPreconnectUrls = [];
  var fontPrefetchUrls = [];
  var imgPrefetchUrls = [];

  function preconnect(url, callback) {
    var link = document.createElement("link");
    link.rel = "dns-prefetch preconnect";
    link.href = url;
    link.crossOrigin = "";
    link.onload = link.onerror = callback;
    document.head.appendChild(link);
  }

  function preconnectAssets() {
    var resources = [baseURL].concat(fontPreconnectUrls);
    var index = 0;
    (function next() {
      var res = resources[index++];
      if (res) preconnect(res[0], next);
    })();
  }

  function prefetch(url, as, callback) {
    var link = document.createElement("link");
    if (link.relList.supports("prefetch")) {
      link.rel = "prefetch";
      link.fetchPriority = "low";
      link.as = as;
      if (as === "font") link.type = "font/woff2";
      link.href = url;
      link.crossOrigin = "";
      link.onload = link.onerror = callback;
      document.head.appendChild(link);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onloadend = callback;
      xhr.send();
    }
  }

  function prefetchAssets() {
    var resources = [].concat(
      scripts.map(function (url) {
        return [url, "script"];
      }),
      styles.map(function (url) {
        return [url, "style"];
      }),
      fontPrefetchUrls.map(function (url) {
        return [url, "font"];
      }),
      imgPrefetchUrls.map(function (url) {
        return [url, "image"];
      })
    );
    var index = 0;
    (function next() {
      var res = resources[index++];
      if (res) prefetch(res[0], res[1], next);
    })();
  }

  function onLoaded() {
    preconnectAssets();
    prefetchAssets();
  }

  if (document.readyState === "complete") {
    onLoaded();
  } else {
    addEventListener("load", onLoaded);
  }
})();
