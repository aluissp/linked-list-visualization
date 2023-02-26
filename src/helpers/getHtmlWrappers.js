const listWrapperClassName = 'list';
const errorsWrapperClassName = 'errors';

export const getHtmlWrappers = () => {
	const listWrapper = document.getElementsByClassName(listWrapperClassName);
	const errorWrapper = document.getElementsByClassName(errorsWrapperClassName);

	return [listWrapper, errorWrapper];
};
