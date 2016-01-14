

$(document).ready(init);

var contacts = [];

function init() {
	initializeLocalStorage();
	updateContactList();
	$('form').submit(addContact);
}

function initializeLocalStorage() {
	if (!localStorage.contacts) {
		localStorage.contacts = "[]";
	}
	contacts = JSON.parse(localStorage.contacts);
}

function updateContactList() {
	var $contactList = $('#contactList');
	$contactList = $contactList.children().not('#template').empty();
	console.log($contactList);
	var $contacts = contacts.map(function(contact, index) {
		var $row = $('#template').clone();
		$row.removeAttr('id');
		$row.children('.name').text(contact.name);
		$row.children('.tel').text(contact.tel);
		$row.children('.email').text(contact.email);
		$row.children('.addresss').text(contact.address);
		return $row;
	});
	console.log($contacts);
	$('#contactList').append($contacts);
}

function addContact(e) {
	e.preventDefault();
	var newContact = {};
	newContact.name = $('#name').val();
	newContact.tel = $('#tel').val();
	newContact.email = $('#email').val();
	newContact.address = $('#address').val();
	addData(newContact);
}

function addData(newContact) {
	contacts.push(newContact);
	updateContactList();
	stringifyContacts();
	// $('#contactList').append($tr);
}

function stringifyContacts() {
	localStorage.contacts = JSON.stringify(contacts);
}