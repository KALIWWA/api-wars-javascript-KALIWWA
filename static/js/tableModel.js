export {fillTable}
import {showResidentsList} from "./residents.js";

function fillTable(data) {
	let rows = document.querySelectorAll('.row-class');

	for (let i = 0; i < data.length; i++) {
		let row = rows[i];

		for (let j = 0; j <= data[i].length; j++) {
			let cells = row.getElementsByTagName('td');

			if (j <= 5) {
				cells[j].textContent = data[i][j];

			} else if (j === 6 && data[i][j] !== 'No known residents') {
				const residentButton = document.createElement('button');
				residentButton.classList.add('btn', 'btn-outline-info', 'residentButton');
				residentButton.setAttribute('id', 'resident' + i);
				residentButton.setAttribute('data-row-number', i);
				residentButton.textContent = data[i][j].length + ' resident(s)';
				residentButton.addEventListener('click', () => {
					showResidentsList(data, i);
				});
				cells[j].appendChild(residentButton);

			} else if (j === 6 && data[i][j] === 'No known residents') {
				cells[j].textContent = data[i][j];

			} else if (j === data[i].length) {
				const voteButton = document.createElement('button');
				voteButton.classList.add('btn', 'btn-outline-success','voteButton');
				voteButton.setAttribute('id', "vote" + i);
				voteButton.textContent = 'Vote';
				voteButton.addEventListener('click', () => {
					countVote();
				});
				cells[j].appendChild(voteButton);
			}
		}
	}
}

