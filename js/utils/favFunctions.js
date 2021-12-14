export function getExitingFavs() {
	const favs = localStorage.getItem("favorites");

	if (favs === null) {
		return [];
	} else {
		return JSON.parse(favs);
	}
}

export function saveFavs(favs) {
	localStorage.setItem("favorites", JSON.stringify(favs));
}
