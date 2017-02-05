class ContentDirective {
    constructor() {
        this.replace = true;
        this.transclude = true;
        this.restrict = 'E';
        this.templateUrl = '/assets/templates/content.template.html';
    }
}

export default [() => new ContentDirective()];