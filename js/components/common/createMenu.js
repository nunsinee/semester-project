import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
	const { pathname } = document.location;

	const container = document.querySelector("#adminMenu");

	const username = getUsername();

	let authLink = `<a href="login.html" class="nav-link ${
		pathname === "/login.html" ? "active" : ""
	}" ><i class="far fa-sign-in"></i>Login</a>`;

	if (username) {
		authLink = `<a class="nav-link ${
			pathname === "/add.html" ? "active" : ""
		}" href="add.html" >Add New Product</a>
		<button  class="logout" id="logout">Logout ${username}</button>

		`;
	}

	container.innerHTML = ` ${authLink}`;

	logoutButton();
}
