import NetworkViewerController from './network-viewer.controller';

export default ['$stateProvider', $stateProvider => {
    $stateProvider.state('viewer.network', {
        url: "/{:networkId:.{64}}",
        controller: NetworkViewerController,
        controllerAs: 'viewer',
        templateUrl: '/assets/templates/viewer.template.html',
        resolve: {
            network: ['$stateParams', 'NetworkService', ($stateParams, NetworkService) => NetworkService.getNetworkById($stateParams.networkId)]
        }
    });
}];