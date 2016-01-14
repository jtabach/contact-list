

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
	// console.log('list');
	// var $contactList = $('#contactList');
	// $contactList.empty();
	// var $contacts = contacts.map(function(contact) {
	// 	return $('<tr>').text(contact); // tr instead of li
	// });
	// $('#contactList').append($contacts);
}

function addContact(e) {
	e.preventDefault();
	console.log('added');
	var $tr = $('#template').clone();
	$tr.removeAttr('id');
	$tr.children('.name').text($('#name').val());
	$tr.children('.tel').text($('#tel').val());
	$tr.children('.email').text($('#email').val());
	$tr.children('.address').text($('#address').val());
	// $tr.name = $('#name').val();
	// $tr.phone = $('#tel').val();
	// $tr.email = $('#email').val();
	// $tr.address = $('#address').val();
	appendRow($tr);
}

function appendRow($tr) {
	$('#contactList').append($tr);
	console.log($tr);
}