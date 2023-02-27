import { addLast } from '../LinkedList.js';

export const addValueHandler = async event => {
	event.preventDefault();

	const button = event.target.firstElementChild;
	button.setAttribute('disabled', '');

	const data = new FormData(event.target);
	const value = data.get('data');

	await addLast(value);

	button.removeAttribute('disabled', '');
};
