import { baseUrl } from "../js/settings/api.js";
import displayMessage from "../js/components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import addToCart from "./utils/addToCart.js";
import { numberOfItemsInCart } from "./products/numberOfItemsInCart.js";
import { renderFeaturedProducts } from "./components/renderFeaturedProducts.js";
import { getExitingFavs } from "./utils/favFunctions.js";
import addFavoritesDetail from "./utils/addFavoritesDetail.js";

createMenu();
numberOfItemsInCart();

const favorites = getExitingFavs();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;
const container = document.querySelector(".detail-container");

renderFeaturedProducts();

async function getDetailPage() {
	try {
		const response = await fetch(productUrl);
		const detail = await response.json();

		createProductDetailPage(detail);
		document.title = detail.title;
		breadCrumb(detail);
		addToCart(detail);
		addFavoritesDetail(detail);
	} catch (error) {
		displayMessage("error", error, ".detail-container");
	}
}
getDetailPage();

function createProductDetailPage(detail) {
	container.innerHTML = "";

	let cssClass = "fal";
	const doesObjectExist = favorites.find(function (fav) {
		return parseInt(fav.id) === detail.id;
	});

	if (doesObjectExist) {
		cssClass = "fad";
	}

	container.innerHTML = `
				<div class="col-md product__image">
					<div class="embed-responsive embed-responsive-1by1 img-product-border ">
						<div
							class="
								embed-responsive-item
								product__detail-image
							"
							style="
								background-image: url(${detail.image_url});
							"
						>
						</div>
					</div>
				
					<div class="iconFav">
						<i class="${cssClass} fa-heart" 
							data-id= "${detail.id}" 
							data-title="${detail.title}"
							data-description="${detail.description}"
							data-price="${detail.price}"
							data-image="${detail.image_url}">
							</i>	
					</div>
				</div>

				<div class ="col-md">
					<div class="col-md product__content">
						<div class="product-des">
							<div class="product__des--price">
								<h2 class="card-subtitle">
									<span class="text-price"> $ ${detail.price}</span>
								</h2>
								<h5 card-subtitle mb-2">${detail.title}</h5>
							</div>
							
							<div class="product__des ">
								<h3 class="title__product">Description</h3>
								<p>${detail.description}</p>
							</div>

							<div class="product__des--list">
								<i class="fas fa-shipping-timed"></i>Delevery days: 3-7 days
								</div>
								<button class=" add-cart btn btn-success btn-lg" 				data-id="${detail.id}"
								data-title="${detail.title}"
								data-description="${detail.description}"
								data-price="${detail.price}"
								data-image="${detail.image_url}">Add to cart</button>
								<hr class="my-4" />
							</div>
						</div>
					</div>
				</div>

   
        `;
}

//get Breadcrumb

const breadcrumbTitle = document.querySelector("#product-breadcrumb-title");
function breadCrumb(detail) {
	breadcrumbTitle.innerHTML = "";
	breadcrumbTitle.innerHTML = `${detail.title}`;
}
