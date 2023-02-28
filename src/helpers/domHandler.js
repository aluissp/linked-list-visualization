import {
	createNodeAnimation,
	createPointerAnimation,
	removeMoveLeftNodeAndPointer,
	setMoveLeftNodeAndPointer,
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
		let nextNode = newNode.next;
		const [listWrapper] = getHtmlWrappers();

		while (nextNode) {
			const htmlNode = nextNode.getHtml();
			const htmlPointer = nextNode.getPointer();
			setMoveLeftNodeAndPointer({ htmlNode, htmlPointer });

			nextNode = nextNode.next;
		}

		setTimeout(async () => {
			let nextNode = newNode.next;

			const afterHtmlNode = nextNode.getHtml();
			const node = newNode.getHtml();
			const pointer = newNode.getPointer();

			listWrapper.insertBefore(node, afterHtmlNode);
			listWrapper.insertBefore(pointer, afterHtmlNode);
			pointer.firstChild.style.display = 'none';
			await createNodeAnimation(node);
			pointer.firstChild.style.display = 'block';
			await createPointerAnimation(pointer);

			while (nextNode) {
				const htmlNode = nextNode.getHtml();
				const htmlPointer = nextNode.getPointer();
				removeMoveLeftNodeAndPointer({ htmlNode, htmlPointer });

				nextNode = nextNode.next;
			}
			resolve();
		}, 1000);
	});
};
