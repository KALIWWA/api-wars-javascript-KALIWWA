export {createEmptyTable}

function createEmptyTable(data) {
	const tableBody = document.querySelector('#table-body');

	for (let i = 0; i < data.length; i++) {
		let rowId = 'row' + i;
		const tableRow = document.createElement('tr');
		tableRow.classList.add('row-class');
		tableRow.setAttribute('id', rowId);
		tableBody.appendChild(tableRow);

		for (let j = 0; j < data[i].length + 1; j++) {
			const tableCell = document.createElement('td');
			tableRow.appendChild(tableCell);
		}
	}
}
