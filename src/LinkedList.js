import HtmlNode from './components/HtmlNode.js';
import {
	insertNodeInDocument,
	removeAllNodes,
	removeFirstOrLastNode,
	setNodeInDocument,
	updateValueInNode,
} from './helpers/domHandler.js';
import {
	removeElementAnimation,
	searchingNodeAnimation,
	searchingPointerAnimation,
} from './tools/animations.js';
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

		const node = new HtmlNode(value);
		const currentNode = await animateUntilFindNode(index);

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

const animateUntilFindNode = async index => {
	let { currentIndex, currentNode } = getInitialNodeAndIndex();

	while (currentIndex !== index - 1) {
		await searchingNodeAnimation(currentNode.getHtml());
		await searchingPointerAnimation(currentNode.getPointer());
		currentIndex++;
		currentNode = currentNode.next;
	}

	await searchingNodeAnimation(currentNode.getHtml());
	await searchingPointerAnimation(currentNode.getPointer());

	return currentNode;
};

const getNode = index => {
	return new Promise(async (resolve, reject) => {
		if (isEmpty()) return reject('Linked list is empty.');

		if (index >= size() || index < 0) {
			return reject('Out of range index.');
		}

		if (size() - 1 === index) return resolve(linkedList.tailNode);

		if (index === 0) return resolve(linkedList.headNode);

		const currentNode = await animateUntilFindNode(index);

		resolve(currentNode.next);
	});
};

export const updateValue = (index, value) => {
	return new Promise(async (resolve, reject) => {
		const [error, node] = await to(getNode(index));

		if (error) return reject(error);

		node.updateData(value);

		await updateValueInNode(node);

		resolve();
	});
};

export const clean = () => {
	return new Promise(async (resolve, reject) => {
		if (isEmpty()) return reject('Linked list is empty.');

		let { currentNode } = getInitialNodeAndIndex();

		const nodeLists = [];

		while (currentNode) {
			nodeLists.push(currentNode.htmlNode);
			nodeLists.push(currentNode.pointer);
			currentNode = currentNode.next;
		}

		await removeAllNodes(nodeLists);

		linkedList.headNode = null;
		linkedList.tailNode = null;
		linkedList.length = 0;

		resolve();
	});
};

const removeFirst = () => {
	return new Promise(async (resolve, reject) => {
		if (linkedList.headNode === null) return reject('Linked list is empty.');

		await removeFirstOrLastNode(linkedList.headNode);

		linkedList.headNode = linkedList.headNode.next;
		linkedList.length--;

		if (isEmpty()) {
			linkedList.tailNode = null;
		}
		resolve();
	});
};

const removeLast = () => {
	return new Promise(async (resolve, reject) => {
		if (isEmpty()) return reject('Linked list is empty.');

		if (linkedList.length === 1) {
			const [error] = to(removeFirst());

			if (error) return reject(error);

			return resolve();
		}

		await removeFirstOrLastNode(linkedList.tailNode);

		let { currentNode } = getInitialNodeAndIndex();
		while (currentNode.next.next) {
			currentNode = currentNode.next;
		}
		currentNode.next = null;
		linkedList.tailNode = currentNode;
		linkedList.length--;

		resolve();
	});
};

export const removeAt = index => {
	return new Promise(async (resolve, reject) => {
		if (index < 0 || index >= linkedList.length) return reject('Out of Range index');

		if (index === 0) {
			const [error] = await to(removeFirst());

			if (error) return reject(error);

			return resolve();
		}

		if (index === linkedList.length - 1) {
			const [error] = await to(removeLast());

			if (error) return reject(error);

			return resolve();
		}

		let currentNode = await animateUntilFindNode(index);

		await removeFirstOrLastNode(currentNode.next);

		currentNode.next = currentNode.next.next;
		linkedList.length--;

		resolve();
	});
};

export const removeMatchingValues = value => {
	return new Promise(async (resolve, reject) => {
		if (isEmpty()) return reject('Linked list is empty.');

		let { currentNode } = getInitialNodeAndIndex();
		const nodes = [];
		const elementsToDelete = [];

		while (currentNode) {
			if (currentNode.data === value) {
				elementsToDelete.push(currentNode.getHtml());
				elementsToDelete.push(currentNode.getPointer());
			} else nodes.push(currentNode);

			currentNode = currentNode.next;
		}

		loadNodesFromList(nodes);

		const nodesToDeletePromises = elementsToDelete.map(element => removeElementAnimation(element));
		await Promise.all(nodesToDeletePromises);
		elementsToDelete.forEach(element => element.remove());

		resolve();
	});
};

const loadNodesFromList = (nodesLists = []) => {
	linkedList.headNode = null;
	linkedList.tailNode = null;
	linkedList.length = 0;

	const add = node => {
		if (linkedList.headNode) {
			linkedList.tailNode.next = node;
			linkedList.tailNode = node;
			node.next = null;
		} else {
			linkedList.headNode = node;
			linkedList.tailNode = node;
		}

		linkedList.length++;
	};

	nodesLists.forEach(node => add(node));
};
