import Link from './router-link'
import View from './router-view'

let Vue

class SelfVueRouter {
    constructor(options) {
        this.$ops = options;
        this.routesMap = {}
        options.routes.forEach(route => {
            this.routesMap[route.path] = route
        });
        // this.app = new Vue({
        //     data() {
        //         return {
        //             current: '/'
        //         }
        //     }
        // })
        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'matched', [])
        this.match()

        window.addEventListener('hashchange', this.hashChangeHandle.bind(this))
        window.addEventListener('load', this.hashChangeHandle.bind(this))
    }

    hashChangeHandle() {
        // this.app.current = window.location.hash.slice(1);
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }

    match(routes) {
        routes = routes || this.$ops.routes
        for (const route of routes) {
            if (this.current === '/' && route.path === '/') {
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
}

SelfVueRouter.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    Vue.component('router-link', Link)
    Vue.component('router-view', View)
}

export default SelfVueRouter