import {getRegistrationData, getLoginData, logout} from "./user.js";

export {clearElement, addLoggedUserNav, addLogoutListener, addLogoutUserNav, addLoginBtnListener, addRegisterBtnListener}


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

function addRegisterBtnListener() {
	const registrationBtn = document.getElementById('registrationBtn');

	registrationBtn.addEventListener('click', function (event) {
		event.preventDefault();
		getRegistrationData()
	});
}

function addLoginBtnListener() {
	const loginBtn = document.getElementById('loginBtn');

	loginBtn.addEventListener('click', function (event) {
		event.preventDefault();
		getLoginData()
	});
}