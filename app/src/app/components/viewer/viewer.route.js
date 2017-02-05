export default ['$stateProvider', $stateProvider => {
    $stateProvider.state('viewer', {
        url: '/viewer',
        abstract: true,
        template: '<ui-view></ui-view>'
    });
}];