const black = '#181823';
const white = '#FFFBF5';
const inputWhite = '#ECF2FF';
let isActiveNightMode = true;

const themeBtn = document.getElementById('theme-switcher');

const themeLogo = themeBtn.children[0];
const body = document.getElementsByTagName('body')[0];
const inputs = document.getElementsByTagName('input');
const header = document.getElementsByClassName('header-container')[0];
const headerTitle = header.children[1];

const changeTheme = () => {
	themeLogo.style.color = !isActiveNightMode ? white : black;
	body.style.backgroundColor = isActiveNightMode ? white : black;

	[...inputs].forEach(input => {
		input.style.backgroundColor = isActiveNightMode ? inputWhite : white;
	});

	header.style.backgroundColor = isActiveNightMode ? white : black;
	headerTitle.style.color = isActiveNightMode ? black : white;

	isActiveNightMode = !isActiveNightMode;
};

themeBtn.addEventListener('click', changeTheme);

export default themeBtn;
