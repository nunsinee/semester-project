import { getExitingCarts } from "../utils/cartFunction.js";

export function numberOfItemsInCart() {
	const totalItemsInCart = document.querySelector(".totalItems-inCart");
	const totalItemsInCartTwo = document.querySelector(".totalItems-inCartTwo");

	const itemsInCart = getExitingCarts();

	let totalItems = 0;

	itemsInCart.forEach((cart) => {
		totalItems += cart.numberOfUnits;
	});

	totalItemsInCart.innerHTML = totalItems;
	totalItemsInCartTwo.innerHTML = totalItems;
}
numberOfItemsInCart();
