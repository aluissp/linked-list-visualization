import { addValueHandler } from './helpers/formHandlers.js';
import { getForms } from './helpers/getForms.js';

document.addEventListener('DOMContentLoaded', event => {
	const [addForm] = getForms();

	addForm.onsubmit = addValueHandler;
});
