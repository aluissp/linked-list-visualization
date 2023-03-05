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

const setMoveRightNodeAndPointer = ({ htmlNode, htmlPointer }, time = 800) => {
	htmlNode.style.animation = `moveRightNode ${convertToSeconds(time)}s ease`;
	htmlPointer.style.animation = `moveRightNode ${convertToSeconds(time)}s ease`;
};

export const setMoveLeftNodeAndPointer = ({ htmlNode, htmlPointer }, time = 800) => {
	return new Promise(resolve => {
		htmlNode.style.animation = `moveLeftNode ${convertToSeconds(time)}s ease`;
		htmlPointer.style.animation = `moveLeftNode ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			removeAnimationNodeAndPointer({ htmlNode, htmlPointer });
			resolve();
		}, time);
	});
};

const removeAnimationNodeAndPointer = ({ htmlNode, htmlPointer }) => {
	htmlNode.style.animation = null;
	htmlPointer.style.animation = null;
};

export const insertNodeAndPointerAnimation = ({ newNode, listWrapper }, time = 800) => {
	return new Promise((resolve, reject) => {
		let nextNode = newNode.next;

		while (nextNode) {
			const htmlNode = nextNode.getHtml();
			const htmlPointer = nextNode.getPointer();
			setMoveRightNodeAndPointer({ htmlNode, htmlPointer }, time);

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
				removeAnimationNodeAndPointer({ htmlNode, htmlPointer });

				nextNode = nextNode.next;
			}
			resolve();
		}, time);
	});
};

export const updateValueAnimation = (htmlParagraph, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlParagraph.style.animation = `grow ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			htmlParagraph.style.animation = null;
			resolve();
		}, time);
	});
};

export const setFadeInAnimate = (htmlElement, time = 800) => {
	return new Promise(resolve => {
		htmlElement.style.animation = `fadeIn ${convertToSeconds(time)}s ease-in-out`;

		setTimeout(() => {
			htmlElement.style.animation = null;
			resolve();
		}, time);
	});
};

export const toggleMenuDown = (menuWrapper, time = 800) => {
	return new Promise(resolve => {
		menuWrapper.style.animation = `toggleMenuDown ${convertToSeconds(time)}s ease-in-out`;
		setTimeout(() => {
			menuWrapper.style.animation = null;
			resolve();
		}, time);
	});
};

export const toggleMenuUp = (menuWrapper, time = 800) => {
	return new Promise(resolve => {
		menuWrapper.style.animation = `toggleMenuUp ${convertToSeconds(time)}s ease-in-out`;
		setTimeout(() => {
			menuWrapper.style.animation = null;
			resolve();
		}, time);
	});
};

export const removeElementAnimation = (htmlElement, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlElement.style.animation = `deleteNode ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			htmlElement.style.animation = null;
			resolve();
		}, time);
	});
};

const convertToSeconds = milliseconds => milliseconds / 1000;
