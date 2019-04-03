export {loadPage}
import {createEmptyTable} from "./tableView.js";
import {fillTable} from "./tableModel.js";
import {
	addLogoutUserNav,
	addLogoutListener,
	addLoggedUserNav,
	clearElement,
	addLoginBtnListener,
	addRegisterBtnListener
} from "./common.js";

let nextUrl;
let previousUrl;
let nextBtn = document.getElementById('nextButton');
let previousBtn = document.getElementById('previousButton');

nextBtn.addEventListener('click', () => loadPage(nextUrl));
previousBtn.addEventListener('click', () => loadPage(previousUrl));


function loadPage(url) {
	const logNavInfo = document.getElementById('logNavInfo');
	let username = sessionStorage.getItem('username');
	const tableBody = document.querySelector('#table-body');

	let planetsRequest = new XMLHttpRequest();
	planetsRequest.open('GET', url);
	planetsRequest.onload = () => {
		let planetsData = JSON.parse(planetsRequest.responseText);
		let normalisedData = normalisePlanets(planetsData);

		clearElement(tableBody);
		createEmptyTable(normalisedData);
		fillTable(normalisedData);
		nextUrl = planetsData.next;
		previousUrl = planetsData.previous;
		btnStatusUpdate(planetsData);

		if (username) {
			clearElement(logNavInfo);
			addLoggedUserNav(username);
			addLogoutListener();
		} else {
			clearElement(logNavInfo);
			addLogoutUserNav();
			addRegisterBtnListener();
			addLoginBtnListener();
		}
		return planetsData;
	};
	planetsRequest.send();
}


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


function normalisePlanets(data) {
	const allPlanetsData = data.results;

	return allPlanetsData.map((planet) => {
		let name = planet.name,
			diameter = (planet.diameter >= 0) ? planet.diameter + ' km' : 'unknown',
			climate = planet.climate,
			terrain = planet.terrain,
			surfaceWater = (planet.surface_water >= 0) ? planet.surface_water + ' %' : 'unknown',
			population = (planet.population > 0) ? Number(planet.population).toLocaleString('en-US') + ' people' : 'unknown',
			residents = (planet.residents.length > 0) ? planet.residents : 'No known residents';

		return [name, diameter, climate, terrain, surfaceWater, population, residents];
	});
}








