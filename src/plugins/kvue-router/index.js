import routerLink from './router-link';
import routerView from './router-view';
let Vue;
class KVueRouter {
	constructor(options) {
		// options = { routes: [{}, {}] }
		this.$options = options;
		this.current = window.location.hash.slice(1) || '/'
		Vue.util.defineReactive(this, 'matched', [])
		this.match();
		// this.routerMap = {};
		// options.routes.forEach((route) => {
		// 	this.routerMap[route.path] = route
		// })
		// this.app = new Vue({
		// 	data() {
		// 		return {
		// 			current: '/'
		// 		}
		// 	}
		// })
		window.addEventListener('hashchange', this.hashChange.bind(this))
		window.addEventListener('load', this.hashChange.bind(this))
	}

	match(routes) {
		routes = routes || this.$options.routes
		for (const route of routes) {
			if (route.path === '/' && this.current === '/') {
				this.matched.push(route)
				return
			}
			if (route.path !== '/' && this.current.indexOf(route.path) > -1) {
				this.matched.push(route)
				if (route.children) {
					this.match(route.children)
				}
				return
			}
		}
	}

	hashChange() {
		// this.app.current = window.location.hash.slice(1);
		this.current = window.location.hash.slice(1);
		this.matched = []
		this.match();
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