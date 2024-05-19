import express from "express";
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
	createContactSchema,
	updateContactSchema,
	updateStatusSchema,
} from "../schemas/contactsSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import isValidId from "../middleware/isValidId.js";
import isEmptyBody from "../middleware/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContact));

contactsRouter.post(
	"/",
	isEmptyBody,
	validateBody(createContactSchema),
	ctrlWrapper(createContact)
);

contactsRouter.put(
	"/:id",
	isEmptyBody,
	isValidId,
	validateBody(updateContactSchema),
	ctrlWrapper(updateContact)
);
contactsRouter.patch(
	"/:id/favorite",
	isValidId,
	validateBody(updateStatusSchema),
	ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
