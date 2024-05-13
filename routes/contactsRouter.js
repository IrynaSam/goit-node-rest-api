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
} from "../schemas/contactsSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import isValidId from "../middleware/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContact));

contactsRouter.post(
	"/",
	validateBody(createContactSchema),
	ctrlWrapper(createContact)
);

contactsRouter.put(
	"/:id",
	isValidId,
	validateBody(updateContactSchema),
	ctrlWrapper(updateContact)
);
contactsRouter.put(
	"/:id/favorite",
	isValidId,
	validateBody(updateContactSchema),
	ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
