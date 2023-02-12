// 自定义指令
import type { App, Directive, DirectiveBinding } from 'vue';


// 防抖
const debounce: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		let timer: NodeJS.Timeout | null = null;
		el.addEventListener('click', () => {
			let firstClick: Boolean = !timer;
			if (firstClick) {
				binding.value();
			}
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				timer = null;
			}, 1000);
		});
	}
};

const directivesList: any = {
	debounce
};
const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach((key) => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};
export default directives;
