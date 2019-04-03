import {createEmptyTable} from "./tableView.js";
import {fillTable} from "./tableModel.js";

let nextUrl;
let previousUrl;


function loadPage(url) {

	let planetsRequest = new XMLHttpRequest();
	planetsRequest.open('GET', url);
	planetsRequest.onload = () => {
		let planetsData = JSON.parse(planetsRequest.responseText);
		createEmptyTable(planetsData);
		fillTable(planetsData);
		nextUrl = planetsData.next;
		previousUrl = planetsData.previous;

		btnStatusUpdate(planetsData);
		return planetsData;
	};

	planetsRequest.send();

}

loadPage('https://swapi.co/api/planets/?page=1');

let nextBtn = document.getElementById('nextButton');
nextBtn.addEventListener('click', () => loadPage(nextUrl));



let previousBtn = document.getElementById('previousButton');
previousBtn.addEventListener('click', () => loadPage(previousUrl));


function btnStatusUpdate(data) {
	if (data.next === null) {
		nextBtn.classList.add('btn-disabled')
	} else {
		nextBtn.classList.remove('btn-disabled')
	}
	if (data.previous === null) {
		previousBtn.classList.add('btn-disabled')
	} else {
		previousBtn.classList.remove('btn-disabled')
	}
}