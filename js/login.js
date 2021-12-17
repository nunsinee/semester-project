import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";
import { numberOfItemsInCart } from "./products/numberOfItemsInCart.js";

createMenu();
numberOfItemsInCart;

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector("#message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
	event.preventDefault();
	message.innerHTML = "";

	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();

	if (usernameValue.length === 0 || passwordValue.length === 0) {
		return displayMessage(
			"alert-warning",
			"Sorry, username and password cannot be blank!",
			"#message-container"
		);
	}

	doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
	const url = baseUrl + "auth/local";
	const data = JSON.stringify({ identifier: username, password: password });
	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const response = await fetch(url, options);
		const json = await response.json();

		if (json.user) {
			saveToken(json.jwt);
			saveUser(json.user);

			location.href = "/";
		}

		if (json.error) {
			displayMessage(
				"alert-danger",
				"Username or password are not correct!.",
				"#message-container"
			);
		}
	} catch (error) {
		console.log(error);
	}
}
