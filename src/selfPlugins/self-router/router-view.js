export default {
    render(h) {
        let { routesMap, app } = this.$router;
        let vNode = routesMap[app.current] && routesMap[app.current].component || null;
        return h(vNode);
    }
}