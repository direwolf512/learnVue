let Vue

class Store {
    constructor(options) {
        window.console.log(options)
        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappedGetters = options.getters

        const computed = {};
        this.getters = {}
        let store = this
        Object.keys(this._wrappedGetters).forEach(key => {
            let fn = store._wrappedGetters[key];
            computed[key] = function () {
                return fn(store.state)
            }
            Object.defineProperty(store.getters, key, {
                get: () => {
                    return store._vm[key]
                }
            })
        })
        // this.state = new Vue({
        //     data: options.state
        // })
        this._vm = new Vue({
            data: {
                $$state: options.state, // 加两个$，Vue不做代理，对外部是隐藏的，没办法直接通过_vm访问
            },
            computed // 可以直接通过_vm访问 computed:{a:1} => _vm.a == 1
        })
        // 绑定commit，dispatch上下文为Store实例
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    // 存取器
    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        window.console.error('想修改?这样不好!')
    }

    commit(_type, _payload) {
        let { type, payload } = unifyObjectStyle(_type, _payload)
        let entry = this._mutations[type]
        if (entry) {
            entry(this.state, payload)
        }
    }

    dispatch(_type, _payload) {
        let { type, payload } = unifyObjectStyle(_type, _payload)
        let entry = this._actions[type]
        if (entry) {
            entry(this, payload)
        }
    }
}

function unifyObjectStyle(type, payload, options) {
    if (type !== null && typeof type === 'object' && type.type) {
        options = payload;
        payload = type;
        type = type.type;
    }
    return { type, payload, options }
}

function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}