(function(){
	var app = angular.module("student",[]);
	//console.log("appp ---- >>>>> "+JSON.stringify(app));

	app.controller("StudentCtrl",function($scope){
	var studentControl = this;
	studentControl.getArr = [{name:"shubham",surname:"gaur"},{name:"Akshay",surname:"kumawat"}];
	studentControl.showField = false;
	
	
	$scope.showForm = function(){
	studentControl.showField = true;
	studentControl.firstName = '';
	studentControl.lastName = '';
	studentControl.lastDisable = true;
	studentControl.btnDisable = true;
	}
	
	$scope.enableText = function(){
		if(studentControl.firstName.length >=5){
			studentControl.lastDisable = false;
			
		}else{
			studentControl.lastDisable = true;
			studentControl.lastName = '';
			studentControl.btnDisable = true;
		}
		
	}
	
	$scope.btnDisEna = function(){
		if(studentControl.firstName.length >=5 && studentControl.lastName.length >=5){
			studentControl.btnDisable = false;
			}else{
			studentControl.btnDisable = true;	
			}
	}
	$scope.submisson=function(){
		studentControl.getArr.push({name:studentControl.firstName,surname:studentControl.lastName});
		studentControl.showField = false;
	}
	});
	app.controller("PanelController",function($scope){
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
	});
	
})();