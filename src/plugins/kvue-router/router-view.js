export default {
	render(h) {
		// 标记当前 router-view 的深度
		this.$vnode.data.routerView = true;
		let parent = this.$parent;
		let depth = 0;
		//while 循环会一直循环代码块，只要指定的条件为 true。
		while (parent) {
			const vnodeData = parent.$vnode && parent.$vnode.data
			window.console.log(vnodeData, 11)
			if (vnodeData) {
				if (vnodeData.routerView) {
					depth++
				}
			}
			// 一直向父级寻找，以确定深度
			parent = parent.$parent;
		}
		// let { routerMap, app } = this.$router;
		// let vNode = routerMap[app.current].component || null;
		window.console.log(this.$router.matched, 'matched')
		window.console.log(depth, 'depth')
		const route = this.$router.matched[depth];
		window.console.log(route, 'route')
		let vNode = null;
		if (route) {
			vNode = route.component
		}
		return h(vNode);
	}
}