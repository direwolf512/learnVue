export default {
	render(h) {
		let { routerMap, app } = this.$router;
		let vNode = routerMap[app.current].component || null;
		return h(vNode);
	}
}