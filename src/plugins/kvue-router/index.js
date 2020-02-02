import routerLink from './router-link';
import routerView from './router-view';
let Vue;
class KVueRouter {
	constructor(options) {
		// options = { routes: [{}, {}] }
		this.$options = options;
		this.routerMap = {};
		options.routes.forEach((route) => {
			this.routerMap[route.path] = route
		})
		this.app = new Vue({
			data() {
				return {
					current: '/'
				}
			}
		})
		window.addEventListener('hashchange', this.hashChange.bind(this))
		window.addEventListener('load', this.hashChange.bind(this))
	}

	hashChange() {
		this.app.current = window.location.hash.slice(1);
	}
}

KVueRouter.install = function (_Vue) {
	Vue = _Vue;

	Vue.mixin({
		beforeCreate() {
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router // 目的是为了全局组件都可以使用$router(路由实例)
			}
		}
	})

	Vue.component('router-link', routerLink)
	Vue.component('router-view', routerView)
}

export default KVueRouter;