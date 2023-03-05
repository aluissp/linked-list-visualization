import { toggleMenuDown, toggleMenuUp } from '../tools/animations.js';
import { removeAllNodesHandler } from './formHandlers.js';

let wrapper;
let indexInput;
let dataInput;
let isShowRemoveOptions = false;

export const initRemoveHandler = (removeForm, removeValueHandler) => {
	const showBtn = removeForm.firstElementChild.firstElementChild;
	wrapper = removeForm.children[1];
	indexInput = removeForm.children[2];
	dataInput = removeForm.children[3];

	const [removeIndexBtn, removeDataBtn, clearAllBtn] = wrapper.children;

	showBtn.onclick = showRemoveOptions;
	removeIndexBtn.onclick = showIndexInput;
	removeDataBtn.onclick = showDataInput;
	clearAllBtn.onclick = clearAllAction;

	removeForm.onsubmit = removeValueHandler;
};

const showRemoveOptions = async () => {
	hide(indexInput);
	hide(dataInput);

	if (!isShowRemoveOptions) {
		wrapper.className = 'remove-options-wrapper';

		const toggleMenuPromises = [...wrapper.children].map(btn => toggleMenuDown(btn));
		await Promise.all(toggleMenuPromises);

		isShowRemoveOptions = true;
	} else {
		const toggleMenuPromises = [...wrapper.children].map(btn => toggleMenuUp(btn));
		await Promise.all(toggleMenuPromises);
		wrapper.className = 'hide';
		isShowRemoveOptions = false;
	}
};

const clearAllAction = async event => {
	event.preventDefault();
	await Promise.all([showRemoveOptions(), removeAllNodesHandler()]);
};

const showIndexInput = async event => {
	event.preventDefault();
	await showRemoveOptions();
	show(indexInput);
	hide(dataInput);
};

const showDataInput = async event => {
	event.preventDefault();
	await showRemoveOptions();
	show(dataInput);
	hide(indexInput);
};

const hide = htmlElement => (htmlElement.className = 'hide');
const show = htmlElement => (htmlElement.className = '');
