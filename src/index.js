import { getForms } from './helpers/getForms.js';
import { addLast, getInitialNodeAndIndex, size } from './LinkedList.js';

document.addEventListener('DOMContentLoaded', event => {
	const [addForm] = getForms();

	addForm.addEventListener('submit', async event => {
		event.preventDefault();

		const data = new FormData(event.target);
		const value = data.get('data');

		await addLast(value);

		console.log(getInitialNodeAndIndex());

		console.log('size', size());
	});
});
