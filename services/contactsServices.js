import Contact from "../models/Contact.js";

function listContacts(search = {}) {
	const { filter = {} } = search;
	return Contact.find(filter);
}

async function getContactById(contactId) {
	const result = await Contact.findById(contactId);
	return result;
}

function removeContact(contactId) {
	return Contact.findByIdAndDelete(contactId);
}

function addContact(data) {
	return Contact.create(data);
}

function updateContact(contactId, updateData) {
	return Contact.findByIdAndUpdate(contactId, updateData);
}

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
