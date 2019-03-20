import {createEmptyTable} from "./tableView.js";
import {fillTable} from "./tableModel.js";

export let nextUrl;
export let previousUrl;

function loadPage(url) {

	let planetsRequest = new XMLHttpRequest();
	planetsRequest.open('GET', url);
	planetsRequest.onload = () => {
		let planetsData = JSON.parse(planetsRequest.responseText);
		createEmptyTable(planetsData);
		fillTable(planetsData);
		nextUrl = planetsData.next;
		previousUrl = planetsData.previous;

		return planetsData;
	};

	planetsRequest.send();
}

loadPage('https://swapi.co/api/planets/?page=1');

let nextBtn = document.getElementById('nextButton');
nextBtn.addEventListener('click', () => loadPage(nextUrl));

let previousBtn = document.getElementById('previousButton');
previousBtn.addEventListener('click', () => loadPage(previousUrl));
