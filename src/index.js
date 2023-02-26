import { getForms } from './helpers/getForms.js';

document.addEventListener('DOMContentLoaded', event => {
	const [addForm] = getForms();

	console.log(addForm);
});
