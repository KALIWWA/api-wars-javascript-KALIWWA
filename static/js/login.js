export {getLoginData}

function getLoginData() {
	let registrationForm = document.getElementById('loginForm');

	registrationForm.addEventListener('submit', function (event) {
		event.preventDefault();

		let registrationData = {
			username: document.getElementById('userName').value,
			password: document.getElementById('password').value
		};
		sendLoginData(registrationData);

	});
}

function sendLoginData(data) {
	const loginMessage = document.getElementById('loginMessage');
	const loginRequest = new XMLHttpRequest();
	
	loginRequest.open('POST', '/login');
	loginRequest.setRequestHeader('Content-type', 'application/json');
	
	loginRequest.addEventListener('load', function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);
			if (response['state'] === 'success') {
				loginMessage.innerText = 'Login Successful';
				sessionStorage.setItem('username', data['username']);
			} else if (response['state'] === 'error') {
				loginMessage.innerText = 'Wrong password or/and username';
			}
		} else {
			loginMessage.innerText = 'Connection problem, please try again'
		}
	});

	loginRequest.send(JSON.stringify(data));
}
