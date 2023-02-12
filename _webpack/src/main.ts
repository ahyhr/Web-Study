import getList from './data';
import './style.scss';
import myImg from '@/assets/img/4.png';

function init() {
	const list = getList();
	const rootElement = document.getElementById('root');
	const tpl = `<ul>
                ${list.map((v) => `<li>${v}</li>`).join('')}
              </ul>`;

	const image = document.createElement('img');
	image.src = myImg;

	const h1 = document.createElement('h1');
	h1.innerText = 'hhhhaasss';

	rootElement.innerHTML = tpl;
	rootElement.prepend(image);
	rootElement.prepend(h1);

	list.forEach((item) => {
		return console.log(item);
	});
}

init();
