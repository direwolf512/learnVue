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
        this.app = new Vue({
            data() {
                return {
                    current: '/'
                }
            }
        })

        window.addEventListener('hashchange', this.hashChangeHandle.bind(this))
        window.addEventListener('load', this.hashChangeHandle.bind(this))
    }

    hashChangeHandle() {
        this.app.current = window.location.hash.slice(1);
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