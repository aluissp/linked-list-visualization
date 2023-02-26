import { getHtmlWrappers } from './getHtmlWrappers.js';

export const setNodeInDocument = (htmlNode, pointer) => {
	return new Promise((resolve, reject) => {
		const [listWrapper] = getHtmlWrappers();

		listWrapper.appendChild(htmlNode);
		listWrapper.appendChild(pointer);

		resolve();
	});
};
