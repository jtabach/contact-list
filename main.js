

$(document).ready(init);

var contacts = [];

function init() {
	initializeLocalStorage();
	updateContactList();
	$('form').submit(addContact);
	$('#contactList').on('click', '.delete', deleteContact);
	$('#contactList').on('click', '.edit', editContact);
}

function initializeLocalStorage() {
	if (!localStorage.contacts) {
		localStorage.contacts = "[]";
	}
	contacts = JSON.parse(localStorage.contacts);
}

function updateContactList() {
	var $contactList = $('#contactList');
	$contactList = $contactList.children().not('#template').remove();
	var $contacts = contacts.map(function(contact, index) {
		var $row = $('#template').clone();
		$row.removeAttr('id');
		$row.children('.name').text(contact.name);
		$row.children('.tel').text(contact.tel);
		$row.children('.email').text(contact.email);
		$row.children('.address').text(contact.address);
		return $row;
	});
	console.log($contacts);
	$('#contactList').append($contacts);
}

function addContact(e) {
	e.preventDefault();
	var newContact = {
		name: $('#name').val(),
		tel: $('#tel').val(),
		email: $('#email').val(),
		address: $('#address').val()
	}
	addData(newContact);
}

function addData(newContact) {
	contacts.push(newContact);
	updateContactList();
	stringifyContacts();
	$('#addContact').show(); // Toggle buttons
	$('#editContact').hide();
	// $('#contactList').append($tr);
}

function deleteContact() {
	spliceContact();
	updateContactList();
	stringifyContacts();
}

function editContact() {
	var $this = $(this);
	var $editRow = $this.closest('tr').remove();
	var $rowChildren = $editRow.children();
	$('#name').val($rowChildren.eq(0).text());
	$('#tel').val($rowChildren.eq(1).text());
	$('#email').val($rowChildren.eq(2).text());
	$('#address').val($rowChildren.eq(3).text());
	$('#addContact').hide(); // Toggle buttons
	$('#editContact').show();
	spliceContact();
}

function spliceContact(index) {
	var index = $(this).closest('tr').index();
	contacts.splice(index - 1, 1);
}

function stringifyContacts() {
	localStorage.contacts = JSON.stringify(contacts);
}









