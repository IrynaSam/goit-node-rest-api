import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
	const contacts = await contactsService.listContacts();
	res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
	const { id } = req.params;
	const contact = await contactsService.getContactById(id);
	if (!contact) {
		throw HttpError(404);
	}
	res.status(200).json(contact);
};

export const deleteContact = async (req, res, next) => {
	const { id } = req.params;
	const contact = await contactsService.removeContact(id);
	if (!contact) {
		throw HttpError(404);
	}
	res.status(200).json(contact);
};

export const createContact = async (req, res, next) => {
	const newContact = await contactsService.addContact(req.body);
	res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
	const { id } = req.params;
	const updateContact = await contactsService.updateContact(id, req.body);
	if (!updateContact) {
		throw HttpError(404);
	}
	res.status(200).json(updateContact);
};
export const updateStatusContact = async (req, res, next) => {
	const { id } = req.params;
	const updateContact = await contactsService.updateContact(id, req.body);
	if (!updateContact) {
		throw HttpError(404);
	}
	res.status(200).json(updateContact);
};
