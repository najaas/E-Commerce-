/** Shopify CDN: Minification failed

Line 26:2 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 27:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 31:21 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 47:24 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 52:18 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 53:6 Transforming let to the configured target environment ("es5") is not supported yet
Line 61:12 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 62:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 88:8 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 94:10 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 22 more hidden warnings

**/
(function () {
  var __sections__ = {};
  (function () {
    for (
      var i = 0,
        s = document
          .getElementById("sections-script")
          .getAttribute("data-sections")
          .split(",");
      i < s.length;
      i++
    )
      __sections__[s[i]] = true;
  })();
  (function () {
    if (!__sections__["header"]) return;
    try {
      class StickyHeader extends HTMLElement {
        constructor() {
          super();
        }

        connectedCallback() {
          this.header = document.getElementById("shopify-section-header");
          this.headerBounds = {};
          this.currentScrollTop = 0;
          this.preventReveal = false;
          this.predictiveSearch = this.querySelector("predictive-search");

          this.onScrollHandler = this.onScroll.bind(this);
          this.hideHeaderOnScrollUp = () => (this.preventReveal = true);

          this.addEventListener(
            "preventHeaderReveal",
            this.hideHeaderOnScrollUp
          );
          window.addEventListener("scroll", this.onScrollHandler, false);

          this.createObserver();
        }

        disconnectedCallback() {
          this.removeEventListener(
            "preventHeaderReveal",
            this.hideHeaderOnScrollUp
          );
          window.removeEventListener("scroll", this.onScrollHandler);
        }

        createObserver() {
          let observer = new IntersectionObserver((entries, observer) => {
            this.headerBounds = entries[0].intersectionRect;
            observer.disconnect();
          });

          observer.observe(this.header);
        }

        onScroll() {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

          if (
            scrollTop > this.currentScrollTop &&
            scrollTop > this.headerBounds.bottom
          ) {
            if (this.preventHide) return;
            requestAnimationFrame(this.hide.bind(this));
          } else if (
            scrollTop < this.currentScrollTop &&
            scrollTop > this.headerBounds.bottom
          ) {
            if (!this.preventReveal) {
              requestAnimationFrame(this.reveal.bind(this));
            } else {
              window.clearTimeout(this.isScrolling);

              this.isScrolling = setTimeout(() => {
                this.preventReveal = false;
              }, 66);

              requestAnimationFrame(this.hide.bind(this));
            }
          } else if (scrollTop <= this.headerBounds.top) {
            requestAnimationFrame(this.reset.bind(this));
          }

          this.currentScrollTop = scrollTop;
        }

        hide() {
          this.header.classList.add(
            "shopify-section-header-hidden",
            "shopify-section-header-sticky"
          );
          this.closeMenuDisclosure();
          this.closeSearchModal();
        }

        reveal() {
          this.header.classList.add("shopify-section-header-sticky", "animate");
          this.header.classList.remove("shopify-section-header-hidden");
        }

        reset() {
          this.header.classList.remove(
            "shopify-section-header-hidden",
            "shopify-section-header-sticky",
            "animate"
          );
        }

        closeMenuDisclosure() {
          this.disclosures =
            this.disclosures || this.header.querySelectorAll("header-menu");
          this.disclosures.forEach((disclosure) => disclosure.close());
        }

        closeSearchModal() {
          this.searchModal =
            this.searchModal || this.header.querySelector("details-modal");
          this.searchModal.close(false);
        }
      }

      customElements.define("sticky-header", StickyHeader);

      class LocalizationForm extends HTMLElement {
        constructor() {
          super();
          this.elements = {
            input: this.querySelector(
              'input[name="locale_code"], input[name="country_code"]'
            ),
            button: this.querySelector("button"),
            panel: this.querySelector(".disclosure__list-wrapper"),
          };
          this.elements.button.addEventListener(
            "click",
            this.openSelector.bind(this)
          );
          this.elements.button.addEventListener(
            "focusout",
            this.closeSelector.bind(this)
          );
          this.addEventListener("keyup", this.onContainerKeyUp.bind(this));

          this.querySelectorAll("a").forEach((item) =>
            item.addEventListener("click", this.onItemClick.bind(this))
          );
        }

        hidePanel() {
          this.elements.button.setAttribute("aria-expanded", "false");
          this.elements.panel.setAttribute("hidden", true);
        }

        onContainerKeyUp(event) {
          if (event.code.toUpperCase() !== "ESCAPE") return;

          this.hidePanel();
          this.elements.button.focus();
        }

        onItemClick(event) {
          event.preventDefault();
          const form = this.querySelector("form");
          this.elements.input.value = event.currentTarget.dataset.value;
          if (form) form.submit();
        }

        openSelector() {
          this.elements.button.focus();
          this.elements.panel.toggleAttribute("hidden");
          this.elements.button.setAttribute(
            "aria-expanded",
            (
              this.elements.button.getAttribute("aria-expanded") === "false"
            ).toString()
          );
        }

        closeSelector(event) {
          const shouldClose =
            event.relatedTarget && event.relatedTarget.nodeName === "BUTTON";
          if (event.relatedTarget === null || shouldClose) {
            this.hidePanel();
          }
        }
      }

      customElements.define("localization-form", LocalizationForm);
    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["product-recommendations"]) return;
    try {
      class ProductRecommendations extends HTMLElement {
        constructor() {
          super();

          const handleIntersection = (entries, observer) => {
            if (!entries[0].isIntersecting) return;
            observer.unobserve(this);

            fetch(this.dataset.url)
              .then((response) => response.text())
              .then((text) => {
                const html = document.createElement("div");
                html.innerHTML = text;
                const recommendations = html.querySelector(
                  "product-recommendations"
                );

                if (
                  recommendations &&
                  recommendations.innerHTML.trim().length
                ) {
                  this.innerHTML = recommendations.innerHTML;
                }

                if (html.querySelector(".grid__item")) {
                  this.classList.add("product-recommendations--loaded");
                }
              })
              .catch((e) => {
                console.error(e);
              });
          };

          new IntersectionObserver(handleIntersection.bind(this), {
            rootMargin: "0px 0px 200px 0px",
          }).observe(this);
        }
      }

      customElements.define("product-recommendations", ProductRecommendations);
    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["quotes"] && !window.DesignMode) return;
    try {
      (function ($) {
        swipr = () => {
          if ($(".quotes-slider").length) {
            $(".quotes-slider").each(function (i) {
              let slides_per_view = $(this).attr("slidesperview");
              let pause_on_hover = $(this).attr("pauseonhover") ? true : false;
              let slide_delay = $(this).attr("slidedelay");
              let id = $(this).attr("slider-id");
              let swiper = new Swiper($(this)[0], {
                loop: true,
                slidesPerView: slides_per_view,
                spaceBetween: 20,
                autoplay: {
                  delay: slide_delay,
                },
                pagination: {
                  el: "#pagination-" + id + "-btn",
                  clickable: true,
                },
                navigation: {
                  nextEl: "#next-" + id + "-btn",
                  prevEl: "#prev-" + id + "-btn",
                },
                // Responsive breakpoints
                breakpoints: {
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                },
              });
            });
          }
        };

        document.addEventListener("DOMContentLoaded", () => {
          swipr();
        });
      })(jQuery);
    } catch (e) {
      console.error(e);
    }
  })();
})();
