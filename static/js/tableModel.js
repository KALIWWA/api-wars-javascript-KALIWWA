export {fillTable}

function fillTable(data) {
	let rows = document.querySelectorAll('.row-class');
	let requiredPlanetData;

	for (let j = 0; j < data.results.length; j++) {
		let row = rows[j];

		requiredPlanetData = {
			planet: [data.results[j].name,
			         data.results[j].diameter,
			         data.results[j].climate,
			         data.results[j].terrain,
			         data.results[j].surface_water,
			         data.results[j].population,
			         data.results[j].residents.length]
		};

		for (let i = 0; i < requiredPlanetData.planet.length; i++) {
			let cells = row.getElementsByTagName('td');

			if (i === 6 && requiredPlanetData.planet[i] > 0) {
				const residentButton = document.createElement('button');
				residentButton.classList.add('residentButton');
				residentButton.setAttribute('id', 'resident' + i);
				residentButton.textContent = requiredPlanetData.planet[i] + ' resident(s)';
				residentButton.addEventListener('click', () => {
					showResidentsList();
				});
				cells[i].appendChild(residentButton);

			} else if (i === 6 && requiredPlanetData.planet[i] === 0) {
				cells[i].textContent = "No known residents";

			} else {
				cells[i].textContent = requiredPlanetData.planet[i];
			}
		}
	}
}
//
// let nextBtn = document.getElementById('nextButton');
// nextBtn.addEventListener('click', (data) => {
// 	let planetsRequest = new XMLHttpRequest();
// 	let nextUrl = data.next;
// 	planetsRequest.open('GET', nextUrl);
// 	let planetsData = JSON.parse(planetsRequest.responseText);
//
// 	fillTable(planetsData);
// 	// return planetsData;
// });

// function next(data) {
// 	let planetsRequest = new XMLHttpRequest();
// 	let nextUrl = data.next;
// 	planetsRequest.open('GET', nextUrl);
// }