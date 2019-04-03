export {getRegistrationData, getLoginData}

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

				// createVoteBtn();
				clearElement(logNavInfo);
				addLoggedUserNav(username);
				addLogoutListener();

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


function clearElement(element) {

	while (element.firstChild) {
		element.removeChild(element.firstChild)
	}
}

function addLoggedUserNav(username) {
	const logInfo = document.getElementById('logNavInfo');
	const logoutBtn = `<li class="nav-item" id="logoutBtn">
                        <a class="nav-link" data-target="#logoutModal" data-toggle="modal">Logout</a>
                    </li>`;
	const loggedUserInfo = `<li class="nav-item active">
                        <a class="navbar-text">You are logged as ${username}</a>
                    </li>`;

	logInfo.insertAdjacentHTML("beforeend", loggedUserInfo);
	logInfo.insertAdjacentHTML("beforeend", logoutBtn);


}

function addLogoutUserNav() {
	const logInfo = document.getElementById('logNavInfo');
	const registrationBtn = `<li class="nav-item" id="registrationBtn">
                        <a class="nav-link" data-target="#registrationModal" data-toggle="modal">Registration</a>
					</li>`;
	const loginBtn = `<li class="nav-item" id="loginBtn">
                        <a class="nav-link" data-target="#loginModal" data-toggle="modal">Login</a>
					</li>`;

	logInfo.insertAdjacentHTML("beforeend", registrationBtn);
	logInfo.insertAdjacentHTML("beforeend", loginBtn);
}

function addLogoutListener() {
	const logoutBtn = document.getElementById('logoutBtn');

	logoutBtn.addEventListener('click', function (event) {
		event.preventDefault();
		logout();
	});
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