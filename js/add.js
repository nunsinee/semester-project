import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();
if (!token) {
	location.href = "/";
}

createMenu();

const message = document.querySelector(".message-container");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#imageURL");

//This function to get image link from Cloudinary

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

const featured = document.querySelector('input[ type = "checkbox"]');

form.addEventListener("submit", submitForm);

function submitForm(event) {
	event.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = price.value;
	const descriptionValue = description.value.trim();
	const imageValue = image.value.trim();
	const featuredValue = featured.checked;

	if (
		titleValue.length === 0 ||
		priceValue.length === 0 ||
		descriptionValue.length === 0 ||
		imageValue.length === 0 ||
		(featuredValue.checked === true && featuredValue.trim.value() === "")
	) {
		return displayMessage(
			"alert-warning",
			"Please supply proper values.",
			".message-container"
		);
	}

	addProducts(
		titleValue,
		priceValue,
		descriptionValue,
		imageValue,
		featuredValue
	);
}

async function addProducts(title, price, description, image, featured) {
	const url = baseUrl + "products";
	const data = JSON.stringify({
		title: title,
		price: price,
		description: description,
		image_url: image,
		featured: featured,
	});

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token} `,
		},
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();

		if (json.created_at) {
			displayMessage(
				"alert-success",
				"Add Product Success.",
				".message-container"
			);
			form.reset();
		}

		if (json.error) {
			displayMessage("alert-danger", json.message, ".message-container");
		}

		location.href = "/";
	} catch (error) {
		displayMessage(
			"alert-danger",
			"An error ocurred",
			".message-container"
		);
	}
}
