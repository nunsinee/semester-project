export function getExitingCarts() {
	const carts = localStorage.getItem("cartItems");

	if (carts === null) {
		return [];
	} else {
		return JSON.parse(carts);
	}
}

export function saveToStorage(carts) {
	localStorage.setItem("cartItems", JSON.stringify(carts));
}
