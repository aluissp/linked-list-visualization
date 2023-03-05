import { toggleMenuDown, toggleMenuUp } from '../tools/animations.js';
import { removeAllNodesHandler } from './formHandlers.js';

let wrapper;
let indexInput;
let dataInput;
let isShowRemoveOptions = false;

export const initRemoveHandler = (removeForm, removeValueHandler) => {
	const showBtn = removeForm.firstElementChild.children[1];
	wrapper = removeForm.children[1];
	indexInput = removeForm.children[2];
	dataInput = removeForm.children[3];

	const [removeIndexBtn, removeDataBtn, clearAllBtn] = wrapper.children;

	showBtn.onclick = hideOptions;
	removeIndexBtn.onclick = showIndexInput;
	removeDataBtn.onclick = showDataInput;
	clearAllBtn.onclick = clearAllAction;

	removeForm.onsubmit = removeValueHandler;
};

const hideOptions = async element => {
	element?.preventDefault();

	hide(indexInput);
	hide(dataInput);

	wrapper.className = 'remove-options-wrapper';

	const toggleMenuPromises = [...wrapper.children].map(btn =>
		isShowRemoveOptions ? toggleMenuUp(btn) : toggleMenuDown(btn)
	);

	await Promise.all(toggleMenuPromises);

	wrapper.className = isShowRemoveOptions ? 'hide' : 'remove-options-wrapper';

	isShowRemoveOptions = !isShowRemoveOptions;
};

const clearAllAction = async event => {
	event.preventDefault();
	await Promise.all([hideOptions(), removeAllNodesHandler()]);
};

const showIndexInput = async event => {
	event.preventDefault();
	await hideOptions();
	hide(dataInput);
	show(indexInput);
};

const showDataInput = async event => {
	event.preventDefault();
	await hideOptions();
	hide(indexInput);
	show(dataInput);
};

const hide = htmlElement => (htmlElement.className = 'hide');
const show = htmlElement => (htmlElement.className = '');
