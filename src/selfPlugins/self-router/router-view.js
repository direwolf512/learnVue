export default {
    render(h) {
        let depth = 0;
        this.$vnode.data.routerView = true;
        let parent = this.$parent;
        while (parent) {
            let vNodeData = parent.$vnode && parent.$vnode.data;
            if (vNodeData) {
                if (vNodeData.routerView) {
                    depth++
                }
            }
            parent = parent.$parent
        }

        // let { routesMap, app } = this.$router;
        // let vNode = routesMap[app.current] && routesMap[app.current].component || null;
        let vNode = null
        const route = this.$router.matched[depth]
        window.console.log(this.$router.matched)
        if (route) {
            vNode = route.component
        }
        return h(vNode);
    }
}