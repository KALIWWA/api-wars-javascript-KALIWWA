export {getRegistrationData}

function getRegistrationData() {
	let registrationForm = document.getElementById('registrationForm');

	registrationForm.addEventListener('submit', function (event) {
		event.preventDefault();

		let registrationData = {
			username: document.getElementById('userName').value,
			password: document.getElementById('password').value,
			passwordConfirm: document.getElementById('passwordConfirm').value
		};
		register(registrationData);

	});
}

function register(data) {

	const registerMessage = document.getElementById('registerMessage');
	let registrationRequest = new XMLHttpRequest();

	registrationRequest.open('POST', '/registration');
	registrationRequest.setRequestHeader('Content-type', 'application/json');

	registrationRequest.addEventListener('load', function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);
			if (response['state'] === 'success') {
				registerMessage.innerText = 'Registration Successful';
			} else if (response['state'] === 'error') {
				registerMessage.innerText = 'User already exists';
			} else if (response['state'] === 'logged') {
				registerMessage.innerText = 'You are logged';
			} else if (response['state'] === 'notEqualPasswords') {
				registerMessage.innerText = 'Passwords are not equal';
			}
		} else {
			registerMessage.innerText = 'Connection problem, please try again';
		}
	});

	registrationRequest.send(JSON.stringify(data));
}
