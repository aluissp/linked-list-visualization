import { addAt, addLast } from '../LinkedList.js';
import to from '../tools/to.js';
import { showError } from './showError.js';

export const addValueHandler = async event => {
	event.preventDefault();

	const button = event.target.firstElementChild;
	button.setAttribute('disabled', '');

	const data = new FormData(event.target);
	const value = data.get('data');

	const [error] = await to(addLast(+value));

	if (error) showError(error);

	button.removeAttribute('disabled');
};

export const insertValueHandler = async event => {
	event.preventDefault();

	const button = event.target.firstElementChild;
	button.setAttribute('disabled', '');

	const data = new FormData(event.target);
	const index = data.get('index');
	const value = data.get('data');

	const [error] = await to(addAt(+index, +value));
	if (error) showError(error);

	button.removeAttribute('disabled');
};
