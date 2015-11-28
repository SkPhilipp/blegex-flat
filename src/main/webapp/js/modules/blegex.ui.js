angular.module('blegex.ui', []);

angular.module('blegex.ui').service('UI', function () {

    /**
     * Returns the form field css classes to be applied to a Bootstrap 3 form group.
     *
     * @param validatee
     * @returns {object} for ng-class
     */
    this.group = function(validatee){
        return validatee == null ? {} : {
            'has-feedback': validatee.$dirty,
            'has-success': validatee.$dirty && !validatee.$invalid,
            'has-error': validatee.$dirty && validatee.$invalid
        };
    };

    /**
     * Returns the form field css classes to be applied to a Bootstrap 3 form group icon.
     *
     * @param validatee
     * @returns {object} for ng-class
     */
    this.icon = function(validatee){
        return validatee == null ? {} : {
            'glyphicon': true,
            'glyphicon-ok': validatee.$dirty && !validatee.$invalid,
            'glyphicon-remove': validatee.$dirty && validatee.$invalid,
            'form-control-feedback': true,
            'hidden': !validatee.$dirty
        };
    };

});
