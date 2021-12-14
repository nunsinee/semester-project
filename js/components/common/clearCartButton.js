import messages from "../../settings/messages.js";

export default function clearCartButton() {
	const clearCartBtn = document.querySelector("#clearCart");
	const containerCart = document.querySelector(".cart-container");
	const subtotalContainer = document.querySelector(".subtotal-container");
	const totalItemsInCart = document.querySelector(".totalItems-inCart");

	clearCartBtn.addEventListener("click", clearCartItems);

	function clearCartItems() {
		localStorage.removeItem("cartItems");
		containerCart.innerHTML = `<div class="alert alert-warning"> ${messages.emptyCartItems}</div>`;
		subtotalContainer.innerHTML = "";
		totalItemsInCart.innerHTML = "0";
	}
}
