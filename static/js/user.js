export {getRegistrationData, getLoginData, logout}
import {clearElement, addLoggedUserNav, addLogoutListener, addLogoutUserNav} from "./common.js";

function getRegistrationData() {
	let registrationForm = document.getElementById('registrationForm');

	registrationForm.addEventListener('submit', function (event) {
		event.preventDefault();

		let registrationData = {
			username: document.getElementById('userName').value,
			password: document.getElementById('password').value,
			passwordConfirm: document.getElementById('passwordConfirm').value
		};
		registerUser(registrationData);

	});
}

function registerUser(data) {

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


function getLoginData() {
	const loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function (event) {
		event.preventDefault();

		let loginData = {
			username: document.getElementById('loginUserName').value,
			password: document.getElementById('loginPassword').value
		};
		loginUser(loginData);

	});
}

function loginUser(data) {
	const loginMessage = document.getElementById('loginMessage');
	const logNavInfo = document.getElementById('logNavInfo');
	const username = data['username'];
	let loginRequest = new XMLHttpRequest();

	loginRequest.open('POST', '/login');
	loginRequest.setRequestHeader('Content-type', 'application/json');

	loginRequest.addEventListener('load', function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);

			if (response['state'] === 'success') {
				loginMessage.innerText = 'Login Successful';
				sessionStorage.setItem('username', username);

				clearElement(logNavInfo);
				addLoggedUserNav(username);
				addLogoutListener();
				// createVoteBtn();

			} else if (response['state'] === 'fail') {
				loginMessage.innerText = 'Wrong password or/and username';

			} else if (response['state'] === 'logged') {
				loginMessage.innerText = 'You are already logged';

			}
		} else {
			loginMessage.innerText = 'Connection problem, please try again'
		}
	});

	loginRequest.send(JSON.stringify(data));
}


function logout() {
	const logNavInfo = document.getElementById('logNavInfo');
	const logoutMessage = document.getElementById('logoutMessage');


	let logoutRequest = new XMLHttpRequest();
	logoutRequest.open('POST', '/logout');
	logoutRequest.setRequestHeader('Content-type', 'application/json');

	logoutRequest.addEventListener('load', function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);

			if (response['state'] === 'success') {
				logoutMessage.innerText = 'Logout Successful';
				sessionStorage.removeItem('username');
				clearElement(logNavInfo);
				addLogoutUserNav();
				//	clearElement(vote)

			} else if (response['state'] === 'fail') {
				logoutMessage.innerText = 'Wrong password or/and username';
			}
		} else {
			logoutMessage.innerText = 'Connection problem, please try again'
		}
	});
	logoutRequest.send();
}