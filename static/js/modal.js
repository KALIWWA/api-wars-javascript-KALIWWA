function hideModal() {
	const modal = document.querySelector('.modal');

	modal.removeAttribute('display');
	modal.setAttribute('display', 'none');
}

function showModal() {
	const modal = document.querySelector('.modal');

	modal.removeAttribute('display');
	modal.setAttribute('display', 'block');
}