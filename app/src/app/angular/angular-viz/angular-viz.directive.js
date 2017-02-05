class AngularVizDirective {
    constructor() {
        this.restrict = 'E';
        this.require = '^ngModel';
        this.scope = {
            ngModel: '=',
            options: '=',
            onClick: '='
        };
    }

    link($scope, $element, $attrs, ngModel) {
        let network = new vis.Network($element[0], $scope.ngModel, $scope.options || {});
        network.on("click", params => {
            $scope.onClick(params);
        });
    }
}

export default [() => new AngularVizDirective()];