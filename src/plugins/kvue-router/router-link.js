export default {
	props: {
		to: {
			type: String,
			required: true
		}
	},
	//纯运行版本不能使用template
	//template: '<a>123</a>'
	//You are using the runtime-only build of Vue where the template compiler is not available. 
	//Either pre-compile the templates into render functions, or use the compiler-included build.
	//template: '<a>123</a>'
	render(h) {
		// <a href='#/about'>about</a>
		// <router-link to="/about"></router-link>
		// h(tag, data, children)
		return h('a', { attrs: { href: '#' + this.to }, class: 'router-link' }, this.$slots.default)
	}
}