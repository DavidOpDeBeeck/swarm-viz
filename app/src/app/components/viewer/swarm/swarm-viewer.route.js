import SwarmViewerController from './swarm-viewer.controller';

export default ['$stateProvider', $stateProvider => {
    $stateProvider.state('viewer.swarm', {
        url: '/swarm',
        controller: SwarmViewerController,
        controllerAs: 'viewer',
        templateUrl: '/assets/templates/viewer.template.html'
    });
}];