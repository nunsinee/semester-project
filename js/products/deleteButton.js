import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import { getExitingFavs, saveFavs } from "../utils/favFunctions.js";

export default function deleteButton(id) {
	const container = document.querySelector(".delete-container");

	container.innerHTML = `<button type="button" class="btn btn-danger btn-admin" id="delete">Delete</button>`;

	const button = document.querySelector("button#delete");

	button.onclick = async function () {
		const doDelete = confirm(
			"Are you sure you want to delete this product?"
		);

		if (doDelete) {
			const url = baseUrl + "products/" + id;
			const token = getToken();
			const options = {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const response = await fetch(url, options);
				const json = await response.json();

				//To delete item from favorite when delete product

				const existFavs = getExitingFavs();
				const filteredFav = existFavs.filter(function (fav) {
					return JSON.parse(fav.id) !== id;
				});
				saveFavs(filteredFav);
				//location.href = "/";
			} catch (error) {
				console.log(error);
			}

			location.href = "/";
		}
	};
}
