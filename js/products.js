import createMenu from "./components/common/createMenu.js";
import { renderProductBanner } from "./components/renderProductBanner.js";
import { renderProducts } from "./components/renderProducts.js";
import { numberOfItemsInCart } from "./products/numberOfItemsInCart.js";

createMenu();
renderProductBanner();
renderProducts();
numberOfItemsInCart();
