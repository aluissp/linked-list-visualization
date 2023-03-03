import { setFadeInAnimate, updateValueAnimation } from '../tools/animations.js';

const errorWrapper = document.getElementsByClassName('errors')[0];
const icon = errorWrapper.children[0];
const message = errorWrapper.children[1];

export const showError = error => {
	return new Promise(async (resolve, reject) => {
		errorWrapper.className = 'errors show-errors';

		message.innerText = error;

		const elementsToAnimatePromises = [];
		elementsToAnimatePromises.push(updateValueAnimation(icon));
		elementsToAnimatePromises.push(setFadeInAnimate(message));

		await Promise.all(elementsToAnimatePromises);

		resolve();
	});
};

export const hideError = () => (errorWrapper.className = 'errors hide');
