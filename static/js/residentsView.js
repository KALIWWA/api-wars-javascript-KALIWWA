export {showResidentsList}

function showResidentsList(data, index) {

	createResidentsModal(data, index);

	for (let i = 0; i < data[index][6].length; i++) {
		let url = data[index][6][i];
		console.log(url);
		let residentsRequest = new XMLHttpRequest();
		residentsRequest.open('GET', url);
		residentsRequest.onload = () => {
			let residentsData = JSON.parse(residentsRequest.responseText);
			let normalisedResidents = normaliseResidents(residentsData);
			console.log(normalisedResidents);

			fillResidentsModal(normalisedResidents);
		};
		residentsRequest.send();

	}
}

function normaliseResidents(resident) {
	let name = resident.name,
		height = (resident.height >= 0) ? resident.height / 100 + ' m.' : 'unknown',
		mass = (resident.mass >= 0) ? resident.mass / 100 + ' kg' : 'unknown',
		hairColor = resident.hair_color,
		skinColor = resident.skin_color,
		eyeColor = resident.eye_color,
		birthYear = resident.birth_year,
		gender = resident.gender;
	return [name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender];

}

function deleteElement(element) {
	element.remove();
}

function outsideClick(e) {
	if (e.target === residentsModal) {
		residentsModal.remove()
	}
}

function createResidentsModal(data, index) {

	let residentsDiv = document.querySelector('#residents');
	residentsDiv.insertAdjacentHTML('beforebegin', '<div id="residentsModal" class="popup">\n' +
		'        <div class="popup-content">\n' +
		'            <div class="popup-header">\n' +
		'                <span id="popupCloseButton" class="popup-close-btn">&times;</span>\n' +
		'                <p id="popupHeader">Residents of </p>\n' +
		'            </div>\n' +
		'            <div class="popup-body">\n' +
		'                <table class="table table-bordered text-center shadow-sm">\n' +
		'                    <thead class="thead-light" id="residents-table-head">\n' +
		'                    <tr>\n' +
		'                        <th>Name</th>\n' +
		'                        <th>Height</th>\n' +
		'                        <th>Mass</th>\n' +
		'                        <th>Skin Color</th>\n' +
		'                        <th>Hair Color</th>\n' +
		'                        <th>Eye Color</th>\n' +
		'                        <th>Birth Year</th>\n' +
		'                        <th>Gender</th>\n' +
		'                    </tr>\n' +
		'                    </thead>\n' +
		'                    <tbody id="residents-table-body"></tbody>\n' +
		'                </table>\n' +
		'            </div>\n' +
		'        </div>\n' +
		'    </div>');

	let residentsModal = document.getElementById('residentsModal');
	let popupHeader = document.getElementById('popupHeader');
	popupHeader.textContent = 'Residents of ' + data[index][0];

	let popupCloseButton = document.getElementById('popupCloseButton');
	popupCloseButton.addEventListener('click', () => deleteElement(residentsModal));

	window.addEventListener('click', outsideClick);
}




function fillResidentsModal(data) {
	const tableBody = document.querySelector('#residents-table-body');
	const tableRow = document.createElement('tr');

	tableBody.appendChild(tableRow);
	for (let i = 0; i < data.length; i++) {
		const tableCell = document.createElement('td');
		tableCell.textContent = data[i];
		tableRow.appendChild(tableCell);
	}
}