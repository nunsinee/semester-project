import messages from "../../settings/messages.js";

export default function clearFavButton() {
	const clearBtn = document.querySelector("#clearFav");
	const containerFav = document.querySelector(".products-container");

	clearBtn.addEventListener("click", clearFavItems);

	function clearFavItems() {
		localStorage.removeItem("favorites");
		containerFav.innerHTML = `<div class="alert alert-warning"> ${messages.emptyFavItems}</div>`;
	}
}
