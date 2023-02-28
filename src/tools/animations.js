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

export const setMoveLeftNodeAndPointer = ({ htmlNode, htmlPointer }, time = 800) => {
	// return
	htmlNode.style.animation = `moveRightNode ${convertToSeconds(time)}s ease-out`;
	htmlPointer.style.animation = `moveRightNode ${convertToSeconds(time)}s ease-out`;
};

export const removeMoveLeftNodeAndPointer = ({ htmlNode, htmlPointer }) => {
	htmlNode.style.animation = null;
	htmlPointer.style.animation = null;
};

const convertToSeconds = milliseconds => milliseconds / 1000;
