import { getExitingCarts, saveToStorage } from "./utils/cartFunction.js";
import messages from "./settings/messages.js";
import clearCartButton from "./components/common/clearCartButton.js";
import createMenu from "./components/common/createMenu.js";

import addToCart from "./utils/addToCart.js";

createMenu();

const carts = getExitingCarts();

addToCart();

const containerCart = document.querySelector(".cart-container");

if (carts.length === 0) {
	containerCart.innerHTML = `<div class="alert alert-warning ml-4"> ${messages.emptyCartItems}</div>`;
}

function createCartPage() {
	containerCart.innerHTML = "";

	carts.forEach((cart) => {
		containerCart.innerHTML += `
				<div class="cart">
					<div class=" cart__info">
				
							<a  href="detail.html?id=${cart.id}">
								<img src="${cart.image_url}" alt="${cart.title}" class="card-img-top"/>
									
								<div class="card-text">
									<h6 class="card-title">${cart.title}</h6>
									
								</div>
							</a>
							
					</div>
					
					<div class="cart__price">
						<h5 class="cart-text">Price per Unit</h5>
						<div class="cart-price"><small>$</small>${cart.base_price}</div>
					</div>

					<div class=" cart__units">					
						<h5 class="cart-text">Quantities</h5>
						<div class="cart__units--plus-minus">
							<button class="minusButton btn btn-minus" id="minus" data-id="${cart.id}" >-</button>
							<span class="number-unit">${cart.numberOfUnits}</span>
							<button class="plusButton btn btn-plus" data-id="${cart.id}" >+</button>	
						</div>
					</div>

					<div class="cart__price">
						<h5 class="cart-text">Total Price</h5>
						<div class="cart-price"><small>$</small>${cart.price}</div>
					</div>

					<div class="cart__remove">
					<i class="far fa-trash-alt" data-id="${cart.id}"></i>
					</div>
		
				</div>
				`;
	});
}

createCartPage();

containerCart.addEventListener("click", (e) => {
	const plusButton = e.target.classList.contains("plusButton");
	const minusButton = e.target.classList.contains("minusButton");
	const removeButton = e.target.classList.contains("far");

	if (plusButton || minusButton || removeButton) {
		for (let i = 0; i < carts.length; i++) {
			if (carts[i].id == e.target.dataset.id) {
				if (plusButton) {
					carts[i].numberOfUnits += 1;
				} else if (minusButton) {
					carts[i].numberOfUnits -= 1;
				} else if (removeButton) {
					carts[i].numberOfUnits = 0;
				}

				carts[i].price = carts[i].base_price * carts[i].numberOfUnits;

				if (carts[i].numberOfUnits <= 0) {
					carts.splice(i, 1);
					alert("This product will remove from your cart");
				}
			}
		}
	}

	saveToStorage(carts);
	updateTotalPrice(carts);
	createCartPage(carts);
});

function updateTotalPrice() {
	const subtotalContainer = document.querySelector(".subtotal-container");
	const totalItemsInCart = document.querySelector(".totalItems-inCart");

	subtotalContainer.innerHTML = "";

	let totalPrice = 0,
		totalItems = 0;

	carts.forEach((cart) => {
		totalPrice += cart.base_price * cart.numberOfUnits;
		totalItems += cart.numberOfUnits;
	});

	subtotalContainer.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
		2
	)}`;

	totalItemsInCart.innerHTML = totalItems;
}

updateTotalPrice();

clearCartButton();
