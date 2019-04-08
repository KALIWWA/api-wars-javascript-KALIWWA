// //show modal
//
// const modalBtn = document.getElementById('modalBtn');
// modalBtn.addEventListener('click', function () {
//
// 	const modalBg = document.querySelector('.modal-bg');
// 	modalBg.style.display = 'flex';
// });
//
//
// const closeBtn = document.querySelector('.close-modal');
// closeBtn.addEventListener('click', function () {
//
// 	const modalBg = document.querySelector('.modal-bg');
// 	modalBg.style.display = 'none';
// });

// create modal

const modalBtn = document.getElementById('modalBtn');
modalBtn.addEventListener('click', () => createModal());

function createModal() {
	const modalPlace = document.getElementById('modalPlace');
	const modalBg = document.createElement('div');
	modalBg.classList.add('modal-bg');
	modalPlace.appendChild(modalBg);
	
	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');
	modalBg.appendChild(modalContent);

	const modalClose = document.createElement('div');
	modalClose.classList.add('close-modal');
	modalClose.innerText = '+';
	modalContent.appendChild(modalClose);

	const modalTitle = document.createElement('h1');
	modalTitle.innerText = 'Test Modal';
	modalContent.appendChild(modalTitle);

	modalClose.addEventListener('click', () => removeModal());
	window.addEventListener('click', outsideClick);
}

function removeModal() {
	const modalPlace = document.getElementById('modalPlace');

	while (modalPlace.firstChild) {
		modalPlace.removeChild(modalPlace.firstChild)
	}
}

function outsideClick(e) {
	const modalBg = document.querySelector('.modal-bg');
	if (e.target === modalBg) {
		modalBg.remove()
	}
}