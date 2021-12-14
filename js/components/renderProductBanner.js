import { baseUrl } from "../settings/api.js";
import displayMessage from "./common/displayMessage.js";

const url = baseUrl + "product-baner";
const container = document.querySelector(".productBanner-container");

export function renderProductBanner() {
	container.innerHTML = "";

	async function getProductBanner() {
		try {
			const response = await fetch(url);
			const products = await response.json();

			renderProductBannerHero(products);
		} catch (error) {
			displayMessage(
				"alert-danger",
				"An Error ocurred..",
				".featured-container"
			);
		}
	}
	getProductBanner();

	function renderProductBannerHero(products) {
		container.innerHTML = "";

		container.innerHTML = `

		
			<div class="jumbotron embed-responsive embed-responsive-21by9">
					<div class="embed-responsive-item jumbotron jumbo-featured "
						style="
							background-image: url(${products.product_hero_banner.url});
						">

						<h1 class="display-4 product">
							${products.product_banner_alt_text}
						</h1>
												
						</a>
							
					</div>
				</div>	`;
	}
}
