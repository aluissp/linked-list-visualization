import { addValueHandler, insertValueHandler, setValueHandler } from './helpers/formHandlers.js';
import { getForms } from './helpers/getForms.js';

document.addEventListener('DOMContentLoaded', event => {
	const [addForm, insertForm, setForm] = getForms();

	addForm.onsubmit = addValueHandler;
	insertForm.onsubmit = insertValueHandler;
	setForm.onsubmit = setValueHandler;
});
