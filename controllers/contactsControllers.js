import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
	createContactSchema,
	updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
	try {
		const contacts = await contactsService.listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
};

export const getOneContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contactsService.getContactById(id);
		if (!contact) {
			throw HttpError(404);
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

export const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contactsService.removeContact(id);
		if (!contact) {
			throw HttpError(404);
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

export const createContact = async (req, res, next) => {
	try {
		validateBody(createContactSchema);
		const { name, email, phone } = req.body;
		const newContact = await contactsService.addContact(name, email, phone);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async (req, res, next) => {
	validateBody(updateContactSchema);
	const { id } = req.params;
	const updateData = req.body;
	if (Object.keys(updateData).length === 0) {
		return next(HttpError(400, "Body must have at least one field"));
	}
	try {
		const updateContact = await contactsService.updateContact(id, updateData);
		if (!updateContact) {
			throw HttpError(404);
		}
		res.status(200).json(updateContact);
	} catch (error) {
		next(error);
	}
};
