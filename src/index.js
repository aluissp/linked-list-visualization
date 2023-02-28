import { addValueHandler, insertValueHandler } from './helpers/formHandlers.js';
import { getForms } from './helpers/getForms.js';

document.addEventListener('DOMContentLoaded', event => {
	const [addForm, insertForm] = getForms();

	addForm.onsubmit = addValueHandler;
	insertForm.onsubmit = insertValueHandler;
});
