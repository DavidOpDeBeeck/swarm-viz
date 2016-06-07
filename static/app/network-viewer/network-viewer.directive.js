( () => {

    angular.module( 'swarm-viz.directives' )
        .directive( 'visNetwork', () => {
            return {
                restrict: 'E',
                require: '^ngModel',
                scope: {
                    ngModel: '=',
                    options: '='
                },
                link: ( $scope, $element, $attrs, ngModel ) => {
                    new vis.Network( $element[ 0 ], $scope.ngModel, $scope.options || {} );
                }
            }
        } );

} )();
