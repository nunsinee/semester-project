import { getExitingFavs } from "./utils/favFunctions.js";
import messages from "./settings/messages.js";
import clearFavButton from "./components/common/clearFavButton.js";
import createMenu from "./components/common/createMenu.js";
import addToCart from "./utils/addToCart.js";
import { numberOfItemsInCart } from "./products/numberOfItemsInCart.js";
import updateLinkBtn from "./components/common/updateLinkBtn.js";

const favorites = getExitingFavs();

createMenu();
numberOfItemsInCart();
clearFavButton();

const containerFav = document.querySelector(".products-container");

if (favorites.length === 0) {
	containerFav.innerHTML = `
	<div class="alert alert-warning ml-4"> ${messages.emptyFavItems}</div>`;
}

function createFavPage() {
	favorites.forEach((product) => {
		containerFav.innerHTML += `
			<div class="card" id="cartCard">
				<div class="hover01">
					<a href="detail.html?id=${product.id}"><figure><img src="${product.image_url}" class="card-img-top" alt="${product.title}"/></figure></a>
				</div>

				<div class="card-body">
					<a href="detail.html?id=${product.id}"><h5 class="card-title">${product.title}</h5>
					<h5 class="card-subtitle mb-2 "> $ ${product.price}</h5>
					<p class="card-text text-muted">${product.description}See more</p>

					</a>

					<button
						class="add-cart btn btn-dark"
						data-id="${product.id}"
						data-title="${product.title}"
						data-description="${product.description}"
						data-price="${product.price}"
						data-image="${product.image_url}"
					
					>
						Add to cart
					</button>	
					<a class="btn btn-link" id="updateBtn" href="edit.html?id=${product.id}">Edit/Update</a>		

				</div>
				<i class="fad fa-heart "
					data-id= "${product.id}" 
					data-title="${product.title}"
					data-description="${product.description}"
					data-price="${product.price}"
					data-image="${product.image_url}"></i>
			</div>`;

		addToCart();
		updateLinkBtn();
	});
}
createFavPage();
