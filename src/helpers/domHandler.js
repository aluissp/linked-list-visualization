import {
	createNodeAnimation,
	createPointerAnimation,
	insertNodeAndPointerAnimation,
	removeElementAnimation,
	updateValueAnimation,
} from '../tools/animations.js';
import { getHtmlWrappers } from './getHtmlWrappers.js';

export const setNodeInDocument = (htmlNode, pointer) => {
	return new Promise(async (resolve, reject) => {
		const [listWrapper] = getHtmlWrappers();

		listWrapper.appendChild(htmlNode);
		await createNodeAnimation(htmlNode);

		listWrapper.appendChild(pointer);
		await createPointerAnimation(pointer);

		resolve();
	});
};

export const insertNodeInDocument = newNode => {
	return new Promise(async (resolve, reject) => {
		const [listWrapper] = getHtmlWrappers();

		await insertNodeAndPointerAnimation({ newNode, listWrapper });

		resolve();
	});
};

export const updateValueInNode = currentNode => {
	return new Promise(async (resolve, reject) => {
		const htmlNode = currentNode.getHtml();

		const paragraph = document.createElement('p');
		paragraph.innerText = currentNode.data;

		htmlNode.firstElementChild.remove();
		htmlNode.appendChild(paragraph);

		await updateValueAnimation(paragraph);

		resolve();
	});
};

export const removeAllNodes = nodeLists => {
	return new Promise(async (resolve, reject) => {
		const removeListsPromises = nodeLists.map(htmlElement => removeElementAnimation(htmlElement));

		await Promise.all(removeListsPromises);

		nodeLists.forEach(htmlElement => htmlElement.remove());

		resolve();
	});
};
