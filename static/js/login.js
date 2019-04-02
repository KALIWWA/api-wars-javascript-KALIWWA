export {getLoginData, logout}

function getLoginData() {
	let loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function (event) {
		event.preventDefault();

		let registrationData = {
			username: document.getElementById('loginUserName').value,
			password: document.getElementById('loginPassword').value
		};
		login(registrationData);

	});
}

function login(data) {
	const loginMessage = document.getElementById('loginMessage');
	let loginRequest = new XMLHttpRequest();

	loginRequest.open('POST', '/login');
	loginRequest.setRequestHeader('Content-type', 'application/json');

	loginRequest.addEventListener('load', function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);
			if (response['state'] === 'success') {
				let username = data['username'];
				loginMessage.innerText = 'Login Successful';
				sessionStorage.setItem('username', username);
				// createVoteBtn();
				clearLogInfo();
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

function clearLogInfo() {
	let logInfo = document.getElementById('logInfo');

	while (logInfo.firstChild) {
		logInfo.removeChild(logInfo.firstChild)
	}
}

function addLoggedUserNav(username) {
	const logInfo = document.getElementById('logInfo');
	const logoutBtn = `<li class="nav-item" id="logoutBtn">
                        <a class="nav-link" data-target="#logoutModal" data-toggle="modal">Logout</a>
                    </li>`;
	const userInfo = `<li class="nav-item active">
                        <a class="navbar-text">You are logged as ${username}</a>
                    </li>`;

	logInfo.insertAdjacentHTML("beforeend", userInfo);
	logInfo.insertAdjacentHTML("beforeend", logoutBtn);

}

function addLogoutUserNav() {
	const logInfo = document.getElementById('logInfo');
	const registrationBtn = `<li class="nav-item" id="registrationBtn">
                        <a class="nav-link" data-target="#registrationModal" data-toggle="modal">Registration</a>`;
	const loginBtn = `<li class="nav-item" id="loginBtn">
                        <a class="nav-link" data-target="#loginModal" data-toggle="modal">Login</a>`;

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

// LOGOUT



function logout() {
	sessionStorage.removeItem('username');

	clearLogInfo();
	addLogoutUserNav();
}