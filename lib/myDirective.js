form.directive('myDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
        console.log("myDirective_______" + scope.base.length);
        for(var l = 0; l < scope.base.length; l++){
        if (value != scope.base[l].email) {
          mCtrl.$setValidity('validL', true);
        } else {
          mCtrl.$setValidity('validL', false);
          break;
        }}
        return value;
      }
    
      mCtrl.$parsers.push(myValidation);
    }
  };
});