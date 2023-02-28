import HtmlNode from './components/HtmlNode.js';
import { insertNodeInDocument, setNodeInDocument } from './helpers/domHandler.js';
import { searchingNodeAnimation, searchingPointerAnimation } from './tools/animations.js';
import to from './tools/to.js';

const linkedList = {
	headNode: null,
	tailNode: null,
	length: 0,
};

export const size = () => {
	return linkedList.length;
};

export const isEmpty = () => {
	return linkedList.length === 0;
};

const addFirst = value => {
	return new Promise(async (resolve, reject) => {
		const node = new HtmlNode(value);

		const isCurrentNodeEmpty = isEmpty();

		if (!linkedList.headNode) {
			linkedList.tailNode = node;
		}

		node.next = linkedList.headNode;
		linkedList.headNode = node;
		linkedList.length++;

		// Add in document
		if (isCurrentNodeEmpty) {
			await setNodeInDocument(node.getHtml(), node.getPointer());
		} else {
			await insertNodeInDocument(node);
		}
		resolve();
	});
};

export const addLast = value => {
	return new Promise(async (resolve, reject) => {
		const node = new HtmlNode(value);

		if (!linkedList.headNode) {
			const [error] = await to(addFirst(value));

			if (error) return reject(error);

			return resolve();
		}

		linkedList.tailNode.next = node;
		linkedList.tailNode = node;
		linkedList.length++;

		// Add in document
		await setNodeInDocument(node.getHtml(), node.getPointer());
		resolve();
	});
};

export const getInitialNodeAndIndex = () => {
	return { currentIndex: 0, currentNode: linkedList.headNode };
};

export const addAt = (index, value) => {
	return new Promise(async (resolve, reject) => {
		if (index > size() || index < 0) {
			return reject('Out of range index.');
		}

		if (index === 0) {
			const [error] = await to(addFirst(value));

			if (error) return reject(error);

			return resolve();
		}

		if (size() === index) {
			const [error] = await to(addLast(value));

			if (error) return reject(error);

			return resolve();
		}

		let { currentIndex, currentNode } = getInitialNodeAndIndex();
		const node = new HtmlNode(value);

		while (currentIndex !== index - 1) {
			await searchingNodeAnimation(currentNode.getHtml());
			await searchingPointerAnimation(currentNode.getPointer());
			currentIndex++;
			currentNode = currentNode.next;
		}

		await searchingNodeAnimation(currentNode.getHtml());
		await searchingPointerAnimation(currentNode.getPointer());

		const tempNode = currentNode.next;
		currentNode.next = node;
		node.next = tempNode;
		linkedList.length++;

		// Add in document
		const [error] = await to(insertNodeInDocument(node));

		if (error) return reject(error);

		resolve();
	});
};

export const getNode = index => {
	if (index > linkedList.size() || index < 0) {
		throw RangeError('Out of range index.');
	}

	if (linkedList.isEmpty()) return;

	if (linkedList.size() === index) {
		return linkedList.tailNode;
	}

	if (index === 0) {
		return linkedList.headNode;
	}

	let { currentIndex, currentNode } = linkedList.getInitialNodeAndIndex();

	while (index !== currentIndex) {
		currentIndex++;
		currentNode = currentNode.next;
	}

	return currentNode;
};

export const updateValue = (index, value) => {
	try {
		const node = linkedList.getNode(index);
		node.data = value;
	} catch (error) {
		throw error;
	}
};

export const clean = () => {
	linkedList.headNode = null;
	linkedList.tailNode = null;
	linkedList.length = 0;
};
