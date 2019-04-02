import {createEmptyTable, clearTable} from "./tableView.js";
import {fillTable} from "./tableModel.js";
import {getRegistrationData} from "./registration.js";
import {getLoginData, logout} from "./login.js";

let nextUrl;
let previousUrl;

function loadPage(url) {

	let planetsRequest = new XMLHttpRequest();
	planetsRequest.open('GET', url);
	planetsRequest.onload = () => {
		let planetsData = JSON.parse(planetsRequest.responseText);

		let normalisedData = normalisePlanets(planetsData);

		clearTable();
		createEmptyTable(normalisedData);
		fillTable(normalisedData);
		nextUrl = planetsData.next;
		previousUrl = planetsData.previous;

		btnStatusUpdate(planetsData);
		return planetsData;
	};

	planetsRequest.send();

}



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


loadPage('https://swapi.co/api/planets/?page=1');
let registerBtn = document.getElementById('registrationBtn');
let loginBtn = document.getElementById('loginBtn');
// let logoutBtn = document.getElementById('logoutBtn');

registerBtn.addEventListener('click', function (event) {
	event.preventDefault();
	getRegistrationData()
});

loginBtn.addEventListener('click', function (event) {
	event.preventDefault();
	getLoginData();
});

