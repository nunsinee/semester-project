import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import deleteButton from "./products/deleteButton.js";
import { getExitingFavs, saveFavs } from "./utils/favFunctions.js";
import { numberOfItemsInCart } from "./products/numberOfItemsInCart.js";

numberOfItemsInCart();

var myWidget = cloudinary.createUploadWidget(
	{
		cloudName: "frontendstudent",
		uploadPreset: "mimmim",
	},
	(error, result) => {
		if (!error && result && result.event === "success") {
			console.log("Done! Here is the image info: ", result.info.url);
			image.value = `${result.info.url}`;
		}
	}
);

document.getElementById("imageUploadBtn").addEventListener(
	"click",
	function () {
		myWidget.open();
	},
	false
);

const token = getToken();
if (!token) {
	location.href = "/";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

const url = baseUrl + "products/" + id;

const form = document.querySelector(".edit-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#imageURL"); //adding this
const idInput = document.querySelector("#id");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
	try {
		const response = await fetch(url);
		const details = await response.json();

		title.value = details.title;
		price.value = details.price;
		description.value = details.description;
		image.value = details.image_url;
		idInput.value = details.id;
		featured.checked = details.featured;

		deleteButton(details.id);
	} catch (error) {
		console.log(error);
	} finally {
		loading.style.display = "none";
		form.style.display = "block";
	}
})();

form.addEventListener("submit", submitForm); // submit when click

function submitForm(event) {
	event.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = price.value;
	const descriptionValue = description.value.trim();
	const imageValue = image.value.trim();
	const featuredValue = featured.checked;
	const idValue = idInput.value;

	if (
		titleValue.length === 0 ||
		priceValue.length === 0 ||
		descriptionValue.length === 0 ||
		imageValue.length === 0 ||
		(featuredValue.checked === true && featuredValue.trim.value() === "")
	) {
		displayMessage(
			"warning",
			"Please supply proper value",
			".message-container"
		);
	}

	updateProducts(
		titleValue,
		priceValue,
		descriptionValue,
		imageValue,
		featuredValue,
		idValue
	);
}

async function updateProducts(title, price, description, image, featured, id) {
	const url = baseUrl + "products/" + id;
	const data = JSON.stringify({
		id: id,
		title: title,
		price: price,
		description: description,
		image_url: image,
		featured: featured,
	});

	const options = {
		method: "PUT",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();

		//Add this funtion to update value in localStorage when update product

		const currentFavs = getExitingFavs();

		for (let i = 0; i < currentFavs.length; i++) {
			if (currentFavs[i].id === id) {
				currentFavs[i].id === id;
				currentFavs[i].title = title;
				currentFavs[i].price = price;
				currentFavs[i].description = description;
				currentFavs[i].image_url = image;
				currentFavs[i].featured = featured;
			}

			saveFavs(currentFavs);
		}

		if (json.updated_at) {
			displayMessage(
				"alert alert-success",
				"Products updated!",
				".message-container"
			);

			location.href = "/";
		}

		if (json.error) {
			displayMessage(
				"alert alert-danger",
				json.message,
				".message-container"
			);
		}
	} catch (error) {
		console.log(error);
	}
}
