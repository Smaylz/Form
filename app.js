var form = angular.module('myApp', ["ngRoute"]);
   form.config(function($routeProvider){
        $routeProvider.when('',
        {
            templateUrl:'index.html',
            controller:'controllerRegister'
        });
});