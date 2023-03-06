import {
	addValueHandler,
	insertValueHandler,
	removeValueHandler,
	setValueHandler,
} from './helpers/formHandlers.js';
import { getForms } from './helpers/getForms.js';
import { initRemoveHandler } from './helpers/removeHandler.js';
import _ from './tools/theme.js';

document.addEventListener('DOMContentLoaded', event => {
	const [addForm, insertForm, setForm, removeForm] = getForms();

	addForm.onsubmit = addValueHandler;
	insertForm.onsubmit = insertValueHandler;
	setForm.onsubmit = setValueHandler;
	initRemoveHandler(removeForm, removeValueHandler);
});
