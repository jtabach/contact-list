

$(document).ready(init);

var contacts = [];
var editInProgress = false;

function init() {
	initializeLocalStorage();
	updateContactList();
	$('form').submit(addContact);
	$('#contactList').on('click', '.delete', deleteContact);
	$('#contactList').on('click', '.edit', editContact);
	$('.sort').on('click', sortContacts);
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
		name: _.upperFirst($('#name').val()),
		tel: $('#tel').val(),
		email: _.lowerFirst($('#email').val()),
		address: _.upperFirst($('#address').val())
	}
	addData(newContact);
}

function addData(newContact) {
	contacts.push(newContact);
	updateContactList();
	stringifyContacts();
	$('#addContact').show(); // Toggle buttons
	$('#editContact').hide();
	editInProgress = false;
	$('form').trigger('reset');
}

function deleteContact() {
	if (!editInProgress) { // Don't allow delete while edit in progress
		var index = $(this).closest('tr').index();
		spliceContact(index);
		updateContactList();
		stringifyContacts();
	}
}

function editContact() {
	if (!editInProgress) { // Don't allow multiple edits when one in progress
		var $this = $(this);
		var index = $(this).closest('tr').index();
		var $editRow = $this.closest('tr').remove();
		spliceContact(index);
		var $rowChildren = $editRow.children();
		$('#name').val($rowChildren.eq(0).text());
		$('#tel').val($rowChildren.eq(1).text());
		$('#email').val($rowChildren.eq(2).text());
		$('#address').val($rowChildren.eq(3).text());
		$('#addContact').hide(); // Toggle buttons
		$('#editContact').show();
		updateContactList();
		stringifyContacts();
		editInProgress = true;
	}
}

function spliceContact(index) {
	contacts.splice(index - 1, 1);
}

function stringifyContacts() {
	localStorage.contacts = JSON.stringify(contacts);
}

function sortContacts() {
	var key = $(this).data("sortby");
	contacts = _.sortBy(contacts, function(o) {
		return o[key];
	});
	updateContactList();
	stringifyContacts();
}







