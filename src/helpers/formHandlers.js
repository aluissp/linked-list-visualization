import {
	addAt,
	addLast,
	clean,
	removeAt,
	removeMatchingValues,
	updateValue,
} from '../LinkedList.js';
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

export const removeValueHandler = async event => {
	event.preventDefault();
	hideError();

	const button = event.target.firstElementChild;
	button.setAttribute('disabled', '');

	const indexInput = event.target.children[2];
	const dataInput = event.target.children[3];

	const index = indexInput.value;
	const value = dataInput.value;

	let errorMessage;

	if (!index || !value) {
		errorMessage = 'You must choose an option to remove nodes and give an index or data';
	}

	if (!!index) {
		let [error] = await to(removeAt(+index));

		errorMessage = error;
	}

	if (!!value) {
		let [error] = await to(removeMatchingValues(+value));

		errorMessage = error;
	}

	if (errorMessage) await showError(errorMessage);

	indexInput.value = '';
	dataInput.value = '';

	button.removeAttribute('disabled');
};

export const removeAllNodesHandler = async () => {
	hideError();

	const [error] = await to(clean());

	if (error) await showError(error);
};
