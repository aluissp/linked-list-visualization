import { createNodeAnimation, createPointerAnimation } from '../tools/animations.js';
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
