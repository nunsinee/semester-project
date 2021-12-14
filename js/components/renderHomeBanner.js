import { baseUrl } from "../settings/api.js";
import displayMessage from "./common/displayMessage.js";

const container = document.querySelector(".banner-container");

const url = baseUrl + "home";

export function renderHomeBanner() {
	async function getHomeBanner() {
		try {
			const response = await fetch(url);
			const home = await response.json();

			homeBanner(home);
		} catch (error) {
			displayMessage(
				"alert-danger",
				"An Error ocurred..",
				".banner-container"
			);
		}
	}
	getHomeBanner();

	function homeBanner(home) {
		container.innerHTML = "";

		container.innerHTML = `
				<div class="jumbotron embed-responsive embed-responsive-21by9 ">
					<div class="embed-responsive-item jumbotron home_hero "
						style="
							background-image: url(${home.hero_banner.url});"
							alt ="${home.hero_banner_alt_text}"
						>

						<h1 class="display-4 home">
						${home.hero_banner_alt_text}
						</h1>

						<p class="lead">
							A little green pot on your working desk, give you a break from computer screen. Did you know that "cactus" absorbs the harmful light from computers ... 
						</p>

						<a class="btn btn-primary btn-home-banner" href="./products.html"role="button"
							>View all plant product
						</a>
					</div>
				</div>	
			`;
	}
}
