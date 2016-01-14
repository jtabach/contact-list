

$(document).ready(init);

function init() {
	initializeLocalStorage();
	updateContactList();
}

function initializeLocalStorage() {
	if (!localStorage.contacts) {
		localStorage.contacts = "[]";
	}
	contacts = JSON.parse(localStorage.contacts);
}

function updateContactList() {
	
}