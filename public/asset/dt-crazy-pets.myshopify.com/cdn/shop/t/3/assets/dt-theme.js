/** Shopify CDN: Minification failed

Line 56:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 57:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 58:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 73:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 78:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 163:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 165:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 166:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 167:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 168:0 Transforming const to the configured target environment ("es5") is not supported yet

**/
$("swiper-component .testimonials-list").each(function (index, element) {
  var $this = $(this);
  $this.addClass("instance-" + index);
  $this.find(".swiper-button-prev").addClass("btn-prev-" + index);
  $this.find(".swiper-button-next").addClass("btn-next-" + index);
  var swiper = new Swiper(".instance-" + index, {
    // your settings ...
    nextButton: ".btn-next-" + index,
    prevButton: ".btn-prev-" + index,
  });
});

if ($("#preloader").length > 0) {
  $(window).on("load", function () {
    $("#preloader")
      .delay(350)
      .fadeOut("slow", function () {
        if ($(".preloader-overflow").length > 0) {
          $("body").removeClass("preloader-overflow");
        }
      });
  });
}

InitCustomFunctions();
function InitCustomFunctions() {
  if ($(".pagination-method-loadmore_btn").length > 0) {
    var AjaxMethod = "click";
  } else {
    var AjaxMethod = "scroll";
  }

  if ($(".collection #AjaxinatePagination").length > 0) {
    var endlessScroll = new Ajaxinate({
      container: ".AjaxinateContainer",
      pagination: "#AjaxinatePagination",
      method: AjaxMethod,
      offset: 0,
      callback: null,
    });
  }
  if ($(".toggleFilter").length > 0) {
    const filter = document.querySelector(".toggleFilter");
    const sidebar = document.querySelector(".facets-vertical");
    const closeDiv = document.querySelector(".close-sidebar");

    filter.addEventListener("click", () => {
      filter.classList.toggle("active");
      sidebar.classList.toggle("open");
    });

    closeDiv.addEventListener("click", () => {
      filter.classList.remove("active");
      sidebar.classList.remove("open");
    });
  }

  //product page color variant to select thumbnail img change color_variants
  $('input:radio[name="Color"]').click(function () {
    const cvariant = $(this).val();
    $('input:radio[name="Color"]')
      .next(".swatch-element")
      .removeClass("clicked");
    $(this).next(".swatch-element").addClass("clicked");
    $(".slick-list").addClass("height_fix");
    $(".thumbnail-list__item").each(function () {
      const variant_val = $(this).find("img").attr("alt");
      if (cvariant == variant_val) {
        $(this).addClass("show");
        $(this).removeClass("hidden");
      } else {
        $(this).addClass("hidden");
        $(this).removeClass("show");
      }
    });
  });

  //     Item swatch trigger start
  $(document).on("click", ".color-values a", function () {
    if ($(this).hasClass("active")) {
      $(".color-values a").removeClass("active");
    } else {
      $(".color-values a").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(document).on("click", ".size-values a", function () {
    if ($(this).hasClass("active")) {
      $(".size-values a").removeClass("active");
      $(this)
        .parents(".card__content")
        .find(".variant-option-size .size-values")
        .removeClass("active");
    } else {
      $(".size-values a").removeClass("active");
      $(this).addClass("active");
      $(this)
        .parents(".card__content")
        .find(".variant-option-size .size-values")
        .removeClass("active");
    }
  });
  $("body").on("click", ".swatch span", function (event) {
    if ($(this).data("image").indexOf("no-image") == -1) {
      $(this)
        .parents(".card__content")
        .find(".image_group .featured-image")
        .attr("srcset", $(this).data("image"));
    }
    var PickedColor = $(this).data("variant-item");
    if ($(".choosen-swatch").length > 0) {
      $(this)
        .parents(".card__content")
        .find(".card__information .full-unstyled-link span")
        .text(" - " + PickedColor);
    }
    if ($(this).parents(".swatch").hasClass("color")) {
      var variant = $(this).data("id");
      $(this).parents(".card__content").find(".variant-push").val(variant);
      var swatch_item = $(this).data("variant-item");
      $(this)
        .parents(".card__content")
        .find(".variant-option-size .size-values")
        .removeClass("active");
      $(this)
        .parents(".card__content")
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
            if ($(this).parent().hasClass(".active")) {
              $(this).parent().removeClass("active");
            } else {
              $(this).parent().addClass("active");
            }
          }
        });
    }
    if ($(this).parents(".swatch").hasClass("size")) {
      var variant = $(this).data("id");
      $(this).parents(".card__content").find(".variant-push").val(variant);
    }
  });

  $("body").on("click", ".color-values-plus a", function (e) {
    $(this)
      .parents(".variant-option-color")
      .find(".show-on-click")
      .css("display", "flex");
    $(this).parents(".color-values-plus").css("display", "none");
    e.preventDefault();
  });
  //     Item swatch trigger end

  $(".custom-product-grid li").click(function () {
    var classNames =
      "grid--1-col-desktop grid--2-col-desktop grid--3-col-desktop grid--4-col-desktop grid--5-col-desktop grid--6-col-desktop";
    var getCols = $(this).data("cols");
    $(".custom-product-grid li").removeClass("active");
    $(this).addClass("active");
    $("ul#product-grid").removeClass(classNames).addClass(getCols);
  });
  if ($(".filter-buttons").length > 0) {
    const viewExists = document.querySelector(".grid-view-button");
    if (viewExists.classList.contains("layout-mode")) {
      const listViewButton = document.querySelector(".list-view-button");
      const gridViewButton = document.querySelector(".grid-view-button");
      const list = document.querySelector("ul.view-mode");
      const gridviewlist = document.querySelector(".custom-product-grid");

      listViewButton.onclick = function () {
        listViewButton.classList.add("active");
        gridViewButton.classList.remove("active");
        list.classList.remove("grid-view-filter");
        list.classList.add("list-view-filter");
        gridviewlist.classList.add("hidden");
      };

      gridViewButton.onclick = function () {
        listViewButton.classList.remove("active");
        gridViewButton.classList.add("active");
        list.classList.remove("list-view-filter");
        list.classList.add("grid-view-filter");
        gridviewlist.classList.remove("hidden");
      };
    }
  }
  if ($("#swiper-sidebar-carousel").length > 0) {
    var swiper = new Swiper("#swiper-sidebar-carousel", {
      navigation: {
        nextEl: "#swiper-sidebar-next",
        prevEl: "#swiper-sidebar-prev",
      },
    });
  }
}
