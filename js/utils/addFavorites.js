import { getExitingFavs, saveFavs } from "./favFunctions.js";

export default function addFavorites() {
	const favButtons = document.querySelectorAll("i");

	favButtons.forEach((button) => {
		button.addEventListener("click", favClick);
	});

	function favClick() {
		this.classList.toggle("fal");
		this.classList.toggle("fad");

		const id = this.dataset.id;
		const title = this.dataset.title;
		const price = this.dataset.price;
		const description = this.dataset.description;
		const image = this.dataset.image;

		const currentFavs = getExitingFavs();

		const productExists = currentFavs.find(function (fav) {
			return fav.id === id;
		});

		if (productExists === undefined) {
			const product = {
				id: id,
				title: title,
				price: price,
				description: description,
				image_url: image,
			};

			currentFavs.push(product);

			saveFavs(currentFavs);
		} else {
			const newFavs = currentFavs.filter((fav) => fav.id !== id);
			saveFavs(newFavs);
		}
	}
}
