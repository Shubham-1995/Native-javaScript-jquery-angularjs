(function(){
	var app = angular.module('modApp',[]);
	app.directive('panelController',function(){
		return{
			restrict:'EA',
			templateUrl:'panel.html',
			controller:function($scope){
					var panelControl = this;
		panelControl.tab = 1;
		panelControl.description = "this is the way you describe the student in own way";
		panelControl.specification = "this is for any specific thing for student";
		panelControl.reviewsArr = [	
								{ 
								stars: 5,
								body: "I love this product!",
								author: "joe@thomas.com"
								},
								{
								stars: 1,
								body: "This product sucks",
								author: "tim@hater.com"	
								}
								];
		$scope.selectTab = function(setTab){
			panelControl.tab  = setTab;
		}
		$scope.isSelected = function(checkTab){
			return panelControl.tab == checkTab;
		}
			},
			controllerAs:'panel'
		};
	});
})();