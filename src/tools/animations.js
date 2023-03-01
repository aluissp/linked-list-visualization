export const createNodeAnimation = (htmlNode, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlNode.style.animation = `highlightNode ${convertToSeconds(time)}s ease`;
		setTimeout(() => {
			htmlNode.style.animation = null;
			resolve();
		}, time);
	});
};

export const createPointerAnimation = (htmlPointer, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlPointer.style.animation = `slide ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			htmlPointer.style.animation = null;
			resolve();
		}, time);
	});
};

export const searchingNodeAnimation = (htmlNode, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlNode.style.animation = `highlightNode ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			htmlNode.style.animation = null;
			resolve();
		}, time);
	});
};

export const searchingPointerAnimation = (htmlPointer, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlPointer.style.animation = `highlightPointer ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			htmlPointer.style.animation = null;
			resolve();
		}, time);
	});
};

const setMoveLeftNodeAndPointer = ({ htmlNode, htmlPointer }, time = 800) => {
	htmlNode.style.animation = `moveRightNode ${convertToSeconds(time)}s ease-out`;
	htmlPointer.style.animation = `moveRightNode ${convertToSeconds(time)}s ease-out`;
};

const removeMoveLeftNodeAndPointer = ({ htmlNode, htmlPointer }) => {
	htmlNode.style.animation = null;
	htmlPointer.style.animation = null;
};

export const insertNodeAndPointerAnimation = ({ newNode, listWrapper }, time = 800) => {
	return new Promise((resolve, reject) => {
		let nextNode = newNode.next;

		while (nextNode) {
			const htmlNode = nextNode.getHtml();
			const htmlPointer = nextNode.getPointer();
			setMoveLeftNodeAndPointer({ htmlNode, htmlPointer }, time);

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
		}, time);
	});
};

const convertToSeconds = milliseconds => milliseconds / 1000;
