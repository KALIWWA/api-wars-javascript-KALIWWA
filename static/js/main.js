import {createEmptyTable} from "./tableView.js";
import {fillTable} from "./tableModel.js";

let planetsRequest = new XMLHttpRequest();
planetsRequest.open('GET', 'https://swapi.co/api/planets/?page=1');
planetsRequest.onload = () => {
	let planetsData = JSON.parse(planetsRequest.responseText);
	createEmptyTable(planetsData);
	fillTable(planetsData);
	return planetsData;
};

planetsRequest.send();

