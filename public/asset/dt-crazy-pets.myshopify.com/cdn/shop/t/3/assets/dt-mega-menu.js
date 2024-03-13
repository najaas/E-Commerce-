$(document).ready(function ($2) {
  "use strict";
  $2(".menu-item-has-children > a")
    .mouseenter(function (e) {
      var selected = $2(this);
      selected.next("div.sub-menu-block").hasClass("is-hidden")
        ? selected
            .addClass("selected")
            .next("div.sub-menu-block")
            .removeClass("is-hidden")
        : selected
            .removeClass("selected")
            .next("div.sub-menu-block")
            .addClass("is-hidden"),
        e.preventDefault();
    })
    .mouseleave(function (e) {
      var selected = $2(this);
      selected.next("div.sub-menu-block").hasClass("is-hidden")
        ? selected
            .addClass("selected")
            .next("div.sub-menu-block")
            .removeClass("is-hidden")
        : selected
            .removeClass("selected")
            .next("div.sub-menu-block")
            .addClass("is-hidden"),
        e.preventDefault();
    });
  function megaMenu() {
    if ($2("#header").length)
      var parentRow = $2("#header"),
        parentLeft = parseInt(parentRow.css("marginLeft").replace("px", ""));
    else
      var parentRow = $2("#header"),
        parentLeft = parseInt(parentRow.offset().left);
    var parentWidth = parentRow.width();
    $2("#header .page-width .dt-nav li:not(.close-nav)").each(function () {
      var thisItem = $2(this);
      if (thisItem.hasClass("has-mega-menu")) {
        var thisItemLeft = thisItem.find("a").offset().left,
          menuLeft = parseInt(thisItemLeft - parentLeft),
          menuLeft = menuLeft - 60;
        thisItem.find(".sub-menu-block").css("width", parentWidth),
          thisItem.find(".sub-menu-block").css("left", -menuLeft);
      }
    }),
      $2("sticky-header .dt-nav li:not(.close-nav)").each(function () {
        var thisItem = $2(this);
        if (thisItem.hasClass("has-mega-menu")) {
          var thisItemLeft = thisItem.find("a").offset().left,
            menuLeft = parseInt(thisItemLeft - parentLeft);
          thisItem.find(".sub-menu-block").css("width", parentWidth),
            thisItem.find(".sub-menu-block").css("left", -menuLeft);
        }
      }),
      window.setTimeout(function () {
        $2(window).trigger("resize");
      }, 800);
  }
  var megaMenuResize = !1;
  $2(window).bind("resize", function () {
    megaMenuResize || (megaMenu(), (megaMenuResize = !0));
  }),
    megaMenu();
});
//# sourceMappingURL=/cdn/shop/t/3/assets/dt-mega-menu.js.map?v=54458764411765748231676868336
