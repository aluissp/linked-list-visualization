export const createNodeAnimation = (htmlNode, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlNode.style.animation = `highlightNode ${convertToSeconds(time)}s ease`;
		setTimeout(() => {
			// htmlNode.style.animation = null;
			resolve();
		}, time);
	});
};

export const createPointerAnimation = (htmlPointer, time = 800) => {
	return new Promise((resolve, reject) => {
		htmlPointer.style.animation = `slide ${convertToSeconds(time)}s ease`;

		setTimeout(() => {
			resolve();
		}, time);
	});
};

const convertToSeconds = milliseconds => milliseconds / 1000;
