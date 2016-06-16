( () => {
    class VisNetwork {
        constructor() {
            this.restrict = 'E';
            this.require = '^ngModel';
            this.scope = {
                ngModel: '=',
                options: '='
            };
        }
        link( $scope, $element, $attrs, ngModel ) {
            new vis.Network( $element[ 0 ], $scope.ngModel, $scope.options || {} );
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'visNetwork', VisNetwork );
} )();
