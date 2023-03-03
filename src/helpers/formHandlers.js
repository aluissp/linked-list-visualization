import { addAt, addLast, updateValue } from '../LinkedList.js';
import to from '../tools/to.js';
import { hideError, showError } from './errors.js';

export const addValueHandler = async event => {
	event.preventDefault();
	hideError();

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
	hideError();

	const button = event.target.firstElementChild;
	button.setAttribute('disabled', '');

	const data = new FormData(event.target);
	const index = data.get('index');
	const value = data.get('data');

	const [error] = await to(addAt(+index, +value));

	if (error) showError(error);

	button.removeAttribute('disabled');
};

export const setValueHandler = async event => {
	event.preventDefault();
	hideError();

	const button = event.target.firstElementChild;
	button.setAttribute('disabled', '');

	const data = new FormData(event.target);
	const index = data.get('index');
	const value = data.get('data');

	const [error] = await to(updateValue(+index, +value));

	if (error) await showError(error);

	button.removeAttribute('disabled');
};
