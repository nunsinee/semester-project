import addToCart from "../utils/addToCart.js";
import { baseUrl } from "../settings/api.js";
import displayMessage from "./common/displayMessage.js";
import updateLinkBtn from "./common/updateLinkBtn.js";
import addFavorites from "../utils/addFavorites.js";
import { getExitingFavs } from "../utils/favFunctions.js";

const url = baseUrl + "products";

const favorites = getExitingFavs();

const container = document.querySelector(".products-container");

export function renderFeaturedProducts() {
	async function getProducts() {
		try {
			const response = await fetch(url);
			const products = await response.json();
			getProductsFeatured(products);
			addFavorites(products);
			addToCart(products);
		} catch (error) {
			displayMessage(
				"alert-danger",
				"An Error ocurred..",
				".products-container"
			);
		}
	}
	getProducts();

	function getProductsFeatured(products) {
		container.innerHTML = "";

		//use Find to find Boolean =true
		const featuredProducts = products.filter(
			(product) => product.featured === true
		);

		featuredProducts.forEach((product) => {
			let cssClass = "fal";
			const doesObjectExist = favorites.find(function (fav) {
				return parseInt(fav.id) === product.id;
			});

			if (doesObjectExist) {
				cssClass = "fad";
			}

			container.innerHTML += ` 

				<div class="card" id="cartCard">
			
					<div class="hover01">
						<a href="detail.html?id=${product.id}"><figure><img src="${product.image_url}" class="card-img-top" alt="${product.title}"/></figure></a>
					</div>

					<div class="card-body">
						<a href="detail.html?id=${product.id}"><h5 class="card-title">${product.title}</h5>
						
						<p class="card-text text-muted">${product.description}See more</p>
						<h5 class="card-subtitle mb-2 "> $ ${product.price}</h5>
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
				<i class="${cssClass} fa-heart" 
					data-id= "${product.id}" 
					data-title="${product.title}"
					data-description="${product.description}"
					data-price="${product.price}"
					data-image="${product.image_url}">
				</i>
			
				</a>`;
		});

		updateLinkBtn();
	}
}
