function defaultRoute($urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
}

export default ['$urlRouterProvider', defaultRoute];