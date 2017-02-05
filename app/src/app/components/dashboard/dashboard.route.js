import DashboardController from './dashboard.controller';

export default ['$stateProvider', $stateProvider => {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        controller: DashboardController,
        controllerAs: 'dashboard',
        templateUrl: '/assets/templates/dashboard.template.html'
    });
}];