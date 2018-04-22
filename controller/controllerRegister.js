form.controller("controller",function($scope,$http, $window){
	
  $http.get("/listen").then(function success(response){
    $scope.base = response.data.rows;
    console.log($scope.base);
  });
	$scope.save = function(formInf){
    console.log(formInf);
	  if($scope.formItem.$valid){
      	  	  $http.post("/register",formInf).
                then(function success(response) {
                  console.log("true");
                    $scope.base = response.event;
                    $scope.loaded = true;
                    $window.location.href = 'home';                   
            }); 
        console.log("valid");
  	  }else {console.log("invalid");}
    };
});