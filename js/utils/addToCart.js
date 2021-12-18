import { getExitingCarts, saveToStorage } from "./cartFunction.js";
import { numberOfItemsInCart } from "../products/numberOfItemsInCart.js";

export default function addToCart() {
	const addToCartButtons = document.querySelectorAll(".add-cart");

	addToCartButtons.forEach((button) => {
		button.addEventListener("click", handelClick);
	});

	function handelClick() {
		const id = this.dataset.id;
		const title = this.dataset.title;
		const price = this.dataset.price;
		const description = this.dataset.description;
		const image = this.dataset.image;

		const currentCarts = getExitingCarts();

		//check if peoduct is in the cart already

		if (currentCarts.some((item) => item.id === id)) {
			alert("This product is already in your cart");
		} else {
			const productExists = currentCarts.find(function (cart) {
				return cart.id === id;
			});

			if (productExists === undefined) {
				const product = {
					id: id,
					title: title,
					price: +price,
					description: description,
					image_url: image,
					numberOfUnits: 1,
					base_price: +price,
				};

				currentCarts.push(product);
				saveToStorage(currentCarts);
			}

			alert("Thank you for addeding this product to your shopping cart");
		}

		numberOfItemsInCart();
	}
}
