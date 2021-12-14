import createMenu from "./components/common/createMenu.js";
import { renderHomeBanner } from "../js/components/renderHomeBanner.js";
import { renderFeaturedProducts } from "./components/renderFeaturedProducts.js";
import { numberOfItemsInCart } from "./products/numberOfItemsInCart.js";

numberOfItemsInCart();
createMenu();
renderHomeBanner();
renderFeaturedProducts();
