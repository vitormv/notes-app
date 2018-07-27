const hasCollapsedParent = (node) => {
    if (node.parent) {
        if (node.parent.model.isCollapsed === true) {
            return true;
        }

        return hasCollapsedParent(node.parent);
    }

    return false;
};

export { hasCollapsedParent };
