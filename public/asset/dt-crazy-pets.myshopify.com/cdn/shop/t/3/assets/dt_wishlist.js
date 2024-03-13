/** Shopify CDN: Minification failed

Line 22:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 24:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 31:26 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 36:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 54:14 Transforming let to the configured target environment ("es5") is not supported yet
Line 100:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 105:25 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 110:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 120:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 124:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 31 more hidden warnings

**/

/**
 * @fileoverview The file mananage dT Theme cookie based wishList
 * dT_General.js, axios, vue libs are dependencies.
 * @package
 */
class dT_WhistList {
  constructor() {
    this.wishListData = [];

    this.LOCAL_STORAGE_WISHLIST_KEY = "shopify-wishlist";
    this.LOCAL_STORAGE_DELIMITER = ",";
  }

  setListLocalStorageKey(LOCAL_STORAGE_WISHLIST_KEY, LOCAL_STORAGE_DELIMITER) {
    this.LOCAL_STORAGE_WISHLIST_KEY = LOCAL_STORAGE_WISHLIST_KEY;
    this.LOCAL_STORAGE_DELIMITER = LOCAL_STORAGE_DELIMITER;
  }

  setupGrid(listType) {
    var wishlist = this.getWishlist();

    var requests = wishlist.map(
      function (handle) {
        var productTileTemplateUrl = "/products/" + handle + "?view=json";

        var getProductsList = this.getProductResponse(productTileTemplateUrl);

        return getProductsList;
      }.bind(this)
    );

    return Promise.all(requests)
      .then(function (responses) {
        var wishlistProductCards = responses.join("%$$%");
        var wishlistProductCards = wishlistProductCards;

        var a_wishlistRecords = wishlistProductCards.split("%$$%");

        let recordsObj = [];

        if (Array.isArray(a_wishlistRecords) && a_wishlistRecords.length) {
          var index = 0;
          a_wishlistRecords.forEach((record) => {
            var a_record = record.split("~~");

            var recordObj = {
              id: a_record[0],
              product_title: a_record[1],
              product_handle: a_record[2],
              product_image: a_record[3],
              vendor: a_record[4],
              type: a_record[5],
              money_price: a_record[6],
              price_min: a_record[7],
              price_max: a_record[8],
              available: a_record[9],
              price_varies: a_record[10],
              variant_id: a_record[11],
              variant_title: a_record[12],
              sku: a_record[13],
              quantity: "1",
              product_url: "/products/" + a_record[2],
            };

            recordsObj[index] = recordObj;

            index = index + 1;
          });
        }

        return recordsObj;
      })
      .then(
        function (data) {
          this.wishListData = data;

          return data;
        }.bind(this)
      );
  }

  getWishListRecords() {
    return this.wishListData;
  }

  getCompareListRecords() {
    return this.wishListData;
  }

  getProductResponse(url) {
    var responseResult = fetch(url)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((data) => {
        console.log(data);
        return data.replace(/^\s*[\r\n]/gm, "");
      });

    return responseResult;
  }

  getTotalCount() {
    return this.getWishlist().length;
  }

  getWishlist() {
    var wishlist =
      localStorage.getItem(this.LOCAL_STORAGE_WISHLIST_KEY) || false;
    if (wishlist) return wishlist.split(this.LOCAL_STORAGE_DELIMITER);
    return [];
  }

  setWishlist(array) {
    var wishlist = array.join(this.LOCAL_STORAGE_DELIMITER);
    if (array.length)
      localStorage.setItem(this.LOCAL_STORAGE_WISHLIST_KEY, wishlist);
    else localStorage.removeItem(this.LOCAL_STORAGE_WISHLIST_KEY);
    return wishlist;
  }

  updateWishlist(handle) {
    var wishlist = this.getWishlist();
    var indexInWishlist = wishlist.indexOf(handle);
    if (indexInWishlist === -1) wishlist.push(handle);
    else wishlist.splice(indexInWishlist, 1);
    return this.setWishlist(wishlist);
  }

  removeWhishlist(handle) {
    var wishlist = this.getWishlist();

    wishlist = this.remove(wishlist, handle);

    return this.setWishlist(wishlist);
  }

  resetWishlist() {
    return this.setWishlist([]);
  }

  isAddedIntoList(handle) {
    var wishlist = this.getWishlist();

    return wishlist.includes(handle);
  }

  remove(arr) {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
}

async function getDTProduct(url) {
  try {
    let res = await fetch(url);

    return res.text().then(function (text) {
      return text;
    });
  } catch (error) {
    console.log(error);
  }
}

class dTXWhishList extends HTMLElement {
  constructor() {
    super();

    this.dTWhistList = new dT_WhistList();

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    this.addWishList = this.querySelector(".add-wishlist");

    this.productHandle = this.addWishList.getAttribute("data-product_handle");
    this.addWishList.addEventListener(
      "click",
      this.debouncedOnSubmit.bind(this)
    );

    this.initLoad();
  }

  onSubmitHandler(event) {
    event.preventDefault();

    if (this.dTWhistList.isAddedIntoList(this.productHandle)) {
      window.location = "/pages/wishlist";
    } else {
      this.addWishList.classList.add("adding");

      this.dTWhistList.updateWishlist(this.productHandle);

      setTimeout(this.postAdd.bind(this), 1000);
    }
  }

  postAdd() {
    document
      .querySelector(".dtxc-wishlist-count")
      .setAttribute("count", this.dTWhistList.getTotalCount());

    this.addWishList.classList.remove("adding");
    this.addWishList.classList.add("added");
  }

  initLoad() {
    if (this.dTWhistList.isAddedIntoList(this.productHandle)) {
      this.addWishList.classList.add("added");
    }
  }
}

customElements.define("dtx-wishlist", dTXWhishList);

class dTXCompare extends HTMLElement {
  constructor() {
    super();

    this.dTWhistList = new dT_WhistList();
    this.dTWhistList.setListLocalStorageKey("dt-compare-list", ",");

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    this.addWishList = this.querySelector(".add-compare");
    this.productHandle = this.addWishList.getAttribute("data-product_handle");

    this.addWishList.addEventListener(
      "click",
      this.debouncedOnSubmit.bind(this)
    );

    this.initLoad();
  }

  onSubmitHandler(event) {
    event.preventDefault();

    if (this.dTWhistList.isAddedIntoList(this.productHandle)) {
      window.location = "/pages/compare";
    } else {
      this.addWishList.classList.add("adding");

      this.dTWhistList.updateWishlist(this.productHandle);

      setTimeout(this.postAdd.bind(this), 1000);
    }
  }

  postAdd() {
    document
      .querySelector(".dtxc-compare-count")
      .setAttribute("count", this.dTWhistList.getTotalCount());

    this.addWishList.classList.remove("adding");
    this.addWishList.classList.add("added");
  }

  initLoad() {
    if (this.dTWhistList.isAddedIntoList(this.productHandle)) {
      this.addWishList.classList.add("added");
    }
  }
}

customElements.define("dtx-compare", dTXCompare);

class dTXWhishListGrid extends HTMLElement {
  constructor() {
    super();

    this.gridTemplate = this.querySelector(".grid_template");

    this.dtxTable = this.querySelector(".dtx-table");
    this.dtxNoRecord = this.querySelector(".dtx-grid-empty");

    this.grid_type = this.getAttribute("grid_type");

    //this.initLoad();
  }

  initLoad() {
    var dTWhistList = new dT_WhistList();
    if ("compareList" == this.grid_type) {
      dTWhistList.setListLocalStorageKey("dt-compare-list", ",");
    }

    dTWhistList.setupGrid().then(
      function (data) {
        this.generateGrid(data);

        return data;
      }.bind(this)
    );
  }

  generateGrid(a_records) {
    var data = this.gridTemplate.innerHTML;

    if (typeof a_records[0].product_handle !== "undefined") {
      if (a_records.length > 0) {
        a_records.forEach(
          function (record) {
            var newRow = this.dtxTable.insertRow(this.dtxTable.rows.length);
            newRow.id = "row_" + record.id;
            newRow.innerHTML = this.buidRow(record);
          }.bind(this)
        );

        this.dtxNoRecord.classList.add("dtx-grid-hide");
        this.dtxTable.classList.add("dtx-grid-show");
      }
    } else {
      this.dtxTable.classList.add("dtx-grid-hide");
      this.dtxNoRecord.classList.add("dtx-grid-show");
    }
  }

  buidRow(record) {
    var templateData = this.gridTemplate.innerHTML;
    templateData = templateData.replace(
      /{item.product_handle}/gi,
      record.product_handle
    );
    templateData = templateData.replace(
      /{item.product_url}/gi,
      record.product_url
    );
    templateData = templateData.replace(
      /{item.product_image}/gi,
      record.product_image
    );
    templateData = templateData.replace(
      /{item.product_title}/gi,
      record.product_title
    );
    templateData = templateData.replace(
      /{item.money_price}/gi,
      record.money_price
    );
    templateData = templateData.replace(
      /{item.variant_id}/gi,
      record.variant_id
    );

    return templateData;
  }

  connectedCallback() {
    // console.log('Custom square element added to page.');
    this.initLoad();
  }
}

customElements.define("dtx-wishlist-grid", dTXWhishListGrid);

class dTXRemoveWishItem extends HTMLElement {
  constructor() {
    super();

    this.removeItem = this.querySelector(".remove-item");

    this.debouncedOnSubmit = debounce((event) => {
      this.removeListItem(event);
    }, 500);

    this.grid_type = this.getAttribute("grid_type");

    this.productHandle = this.removeItem.getAttribute("data-product_handle");

    this.removeItem.addEventListener(
      "click",
      this.debouncedOnSubmit.bind(this)
    );
  }

  removeListItem(event) {
    event.preventDefault();

    var dTWishList = new dT_WhistList();
    if ("compareList" == this.grid_type) {
      dTWishList.setListLocalStorageKey("dt-compare-list", ",");
    }

    dTWishList.removeWhishlist(this.productHandle);

    window.location.reload();
  }
}

customElements.define("dtx-remove-wish-item", dTXRemoveWishItem);

class dTXWishCount extends HTMLElement {
  static get observedAttributes() {
    return ["count"];
  }

  constructor() {
    super();

    this.gridCountBubble = this.querySelector(".grid-count-bubble");

    this.grid_type = this.getAttribute("grid_type");

    this.initLoad();
  }

  initLoad() {
    var dTWishList = new dT_WhistList();
    if ("compareList" == this.grid_type) {
      dTWishList.setListLocalStorageKey("dt-compare-list", ",");
    }

    var totalCount = dTWishList.getTotalCount();

    //this.setAttribute('count', totalCount);

    this.gridCountBubble.querySelector("span").innerHTML = totalCount;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.initLoad();
  }
}

customElements.define("dtx-wish-count", dTXWishCount);

function makeTimer() {
  $(".product-deal-count").each(function () {
    var endTime = new Date($(this).attr("data-end-time"));
    endTime = Date.parse(endTime) / 1000;

    var now = new Date();
    now = Date.parse(now) / 1000;

    var timeLeft = endTime - now;

    if (timeLeft > 0) {
      var days = Math.floor(timeLeft / 86400);
      var hours = Math.floor((timeLeft - days * 86400) / 3600);
      var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
      var seconds = Math.floor(
        timeLeft - days * 86400 - hours * 3600 - minutes * 60
      );

      if (hours < "10") {
        hours = "0" + hours;
      }
      if (minutes < "10") {
        minutes = "0" + minutes;
      }
      if (seconds < "10") {
        seconds = "0" + seconds;
      }

      $(this)
        .find(".days")
        .html(days + "<span>Days</span>");
      $(this)
        .find(".hours")
        .html(hours + "<span>Hrs</span>");
      $(this)
        .find(".minutes")
        .html(minutes + "<span>Mins</span>");
      $(this)
        .find(".seconds")
        .html(seconds + "<span>Secs</span>");
    } else {
      $(this).find(".notice").html("<span>Expired</span>");
    }
  });
}

setInterval(function () {
  makeTimer();
}, 1000);

var swiper = new Swiper("#swiper-sidebar-carousel", {
  slidesPerView: 1,
  navigation: {
    nextEl: "#swiper-sidebar-next",
    prevEl: "#swiper-sidebar-prev",
  },
});

$(document).on("click", ".color-values", function () {
  if ($(this).hasClass("active")) {
    $(".color-values").removeClass("active");
  } else {
    $(".color-values").removeClass("active");
    $(this).addClass("active");
  }
});
$("body").on("click", ".swatch-element.color", function () {
  $(this).next("label").find("i");
});
$("body").on("click", ".swatch span", function () {
  var featuredMedia = $(this)
    .parents(".card-wrapper")
    .find(".card__inner .motion-reduce")
    .attr("srcset", $(this).data("image"));
  $(this)
    .parents(".card-wrapper")
    .find(".card__inner .motion-reduce")
    .attr("srcset", $(this).data("image"));

  if ($(this).parents(".swatch").hasClass("color")) {
    var variant = $(this).data("id");
    $(this).parents("#product-grid").find(".variant-push").val(variant);

    var swatch_item = $(this).data("variant-item");

    $(this)
      .parents("#product-grid")
      .find(".variant-option-size .size-values")
      .removeClass("active");

    $(this)
      .parents("#product-grid")
      .find(".variant-option-size .swatch")
      .each(function () {
        var swatch_size_vars = $(this).find("span").data("variant-title");
        swatch_size_vars = swatch_size_vars.split("/");
        swatch_size_vars = $.map(swatch_size_vars, $.trim);
        swatch_size_vars = $.map(swatch_size_vars, function (n) {
          return n.toLowerCase();
        });
        swatch_size_vars = $.map(swatch_size_vars, function (n) {
          return n.replace(/ /g, "-");
        });

        if ($.inArray(swatch_item, swatch_size_vars) >= 0) {
          $(this).parent(".size-values").toggleClass("active");
        }
      });
  }

  if ($(this).parents(".swatch").hasClass("size")) {
    var variant = $(this).data("id");
    $(this).parents("#product-grid").find(".variant-push").val(variant);
  }
});
