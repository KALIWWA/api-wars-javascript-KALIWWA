export {createEmptyTable}

function createEmptyTable(data) {
	const tableBody = document.querySelector('#table-body');
	const nbOfColumns = 8;

	for (let i = 0; i < data.results.length; i++) {
		let rowId = 'row' + i;
		const tableRow = document.createElement('tr');
		tableRow.classList.add('row-class');
		tableRow.setAttribute('id', rowId);
		tableBody.appendChild(tableRow);

		for (let j = 0; j < nbOfColumns; j++) {
			const tableCell = document.createElement('td');
			tableRow.appendChild(tableCell);

			if (j === nbOfColumns - 1) {
				const voteButton = document.createElement('button');
				voteButton.classList.add('voteButton');
				voteButton.setAttribute('id', "vote" + i);
				voteButton.textContent = 'Vote';
				voteButton.addEventListener('click', () => {
					countVote();
				});
				tableCell.appendChild(voteButton);
			}
		}
	}
}