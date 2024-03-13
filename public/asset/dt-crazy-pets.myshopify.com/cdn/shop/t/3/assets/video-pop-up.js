/** Shopify CDN: Minification failed

Line 11:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 12:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 13:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 14:4 Transforming const to the configured target environment ("es5") is not supported yet

**/
$(document).ready(function () {
  // Watch More Link click handlers
  const $popup = $(".video-popup");
  const $modal = $("#modal");
  const $closeIcon = $(".close");
  const $watchMoreLink = $(".watch-more");

  $watchMoreLink.click(function (e) {
    $popup.fadeIn(200);
    $modal.fadeIn(200);
    e.preventDefault();
    $("body").addClass("overlay-active");
  });
  $closeIcon.click(function () {
    $popup.fadeOut(200);
    $modal.fadeOut(200);
    $("body").removeClass("overlay-active");
  });
  // for escape key
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      $popup.fadeOut(200);
      $modal.fadeOut(200);
    }
  });
  // click outside of the popup, close it
  $modal.on("click", function (e) {
    $popup.fadeOut(200);
    $modal.fadeOut(200);
    $("body").removeClass("overlay-active");
  });
});
