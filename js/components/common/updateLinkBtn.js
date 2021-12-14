import { getUsername } from "../../utils/storage.js";

export default function updateLinkBtn() {
	const updatedButtons = document.querySelectorAll("#updateBtn");

	updatedButtons.forEach(function (button) {
		const user = getUsername();
		if (!user) {
			button.style.display = "none";
		} else {
			button.style.display = "block";
		}
	});
}
