/** Shopify CDN: Minification failed

Line 17:43 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 18:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 23:8 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 23:22 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 24:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 32:8 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 39:10 Transforming const to the configured target environment ("es5") is not supported yet
Line 61:16 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 66:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 75:30 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 9 more hidden warnings

**/
if (!customElements.get("quick-add-modal")) {
  customElements.define(
    "quick-add-modal",
    class QuickAddModal extends ModalDialog {
      constructor() {
        super();
        this.modalContent = this.querySelector('[id^="QuickAddInfo-"]');
      }

      hide(preventFocus = false) {
        const cartNotification =
          document.querySelector("cart-notification") ||
          document.querySelector("cart-drawer");
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = "";

        if (preventFocus) this.openedBy = null;
        super.hide();
      }

      show(opener) {
        opener.setAttribute("aria-disabled", true);
        opener.classList.add("loading");
        opener
          .querySelector(".loading-overlay__spinner")
          .classList.remove("hidden");
        fetch(opener.getAttribute("data-product-url"))
          .then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(
              responseText,
              "text/html"
            );
            this.productElement = responseHTML.querySelector(
              'section[id^="MainProduct-"]'
            );
            this.preventDuplicatedIDs();
            this.removeDOMElements();
            this.setInnerHTML(this.modalContent, this.productElement.innerHTML);
            if (window.Shopify && Shopify.PaymentButton) {
              Shopify.PaymentButton.init();
            }

            if (window.ProductModel) window.ProductModel.loadShopifyXR();

            this.removeGalleryListSemantic();
            this.preventVariantURLSwitching();
            super.show(opener);
          })
          .finally(() => {
            opener.removeAttribute("aria-disabled");
            opener.classList.remove("loading");
            opener
              .querySelector(".loading-overlay__spinner")
              .classList.add("hidden");
          });
      }

      setInnerHTML(element, html) {
        element.innerHTML = html;

        // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
        element.querySelectorAll("script").forEach((oldScriptTag) => {
          const newScriptTag = document.createElement("script");
          Array.from(oldScriptTag.attributes).forEach((attribute) => {
            newScriptTag.setAttribute(attribute.name, attribute.value);
          });
          newScriptTag.appendChild(
            document.createTextNode(oldScriptTag.innerHTML)
          );
          oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
        });
      }

      preventVariantURLSwitching() {
        this.modalContent
          .querySelector("variant-radios,variant-selects")
          .setAttribute("data-update-url", "false");
      }

      removeDOMElements() {
        const pickupAvailability = this.productElement.querySelector(
          "pickup-availability"
        );
        if (pickupAvailability) pickupAvailability.remove();

        const productModal = this.productElement.querySelector("product-modal");
        if (productModal) productModal.remove();
      }

      preventDuplicatedIDs() {
        const sectionId = this.productElement.dataset.section;
        this.productElement.innerHTML =
          this.productElement.innerHTML.replaceAll(
            sectionId,
            `quickadd-${sectionId}`
          );
        this.productElement
          .querySelectorAll("variant-selects, variant-radios")
          .forEach((variantSelect) => {
            variantSelect.dataset.originalSection = sectionId;
          });
      }

      removeGalleryListSemantic() {
        const galleryList = this.modalContent.querySelector(
          '[id^="Slider-Gallery"]'
        );
        if (!galleryList) return;
        galleryList.setAttribute("role", "presentation");
        galleryList
          .querySelectorAll('[id^="Slide-"]')
          .forEach((li) => li.setAttribute("role", "presentation"));

        const FBT = this.modalContent.querySelector(
          '[id^="dT_bundleSelector"]'
        );
        if (FBT) FBT.remove();
        const Tabs = this.modalContent.querySelector(
          '[class^="product__info-as-bottom-tabs"]'
        );
        if (Tabs) Tabs.remove();
      }
    }
  );
}
