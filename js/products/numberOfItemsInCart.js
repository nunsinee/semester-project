import { getExitingCarts } from "../utils/cartFunction.js";

export function numberOfItemsInCart() {
	const totalItemsInCart = document.querySelector(".totalItems-inCart");

	const itemsInCart = getExitingCarts();

	let totalItems = 0;

	itemsInCart.forEach((cart) => {
		totalItems += cart.numberOfUnits;
	});

	totalItemsInCart.innerHTML = totalItems;
}
numberOfItemsInCart();
