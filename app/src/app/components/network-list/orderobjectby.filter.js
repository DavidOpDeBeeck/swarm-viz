export default [() => {
    return (items, field, reverse) => {
        var filtered = [];
        angular.forEach(items, item => {
            filtered.push(item);
        });
        filtered.sort((a, b) => {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
}];