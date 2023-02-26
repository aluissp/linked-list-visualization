export const createPointer = () => {
	const div = document.createElement('div');
	const img = document.createElement('img');

	div.className = 'pointer';
	img.src = 'assets/blue-arrow.png';
	img.alt = 'Arrow';

	div.appendChild(img);
	return div;
};
