class AngularNicescrollDirective {
    constructor() {}
    link(scope, element, attrs, controller) {
        let niceOption = scope.$eval(attrs.niceOption)
        let niceScroll = $(element).niceScroll(niceOption);
        niceScroll.onscrollend = function (data) {
            if (data.end.y >= this.page.maxh) {
                if (attrs.niceScrollEnd) {
                    scope.$evalAsync(attrs.niceScrollEnd);
                }   
            }
        };
    }
}

export default [() => new AngularNicescrollDirective()];