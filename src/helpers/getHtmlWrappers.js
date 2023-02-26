const listWrapperClassName = 'list';
const errorsWrapperClassName = 'errors';

export const getHtmlWrappers = () => {
	const listWrapper = document.getElementsByClassName(listWrapperClassName)[0];
	const errorWrapper = document.getElementsByClassName(errorsWrapperClassName)[0];

	return [listWrapper, errorWrapper];
};
