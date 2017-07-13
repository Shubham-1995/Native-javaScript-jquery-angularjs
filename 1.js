window.routerApp = angular.module('routerApp', ['ui.router','oc.lazyLoad']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',

        })
         // nested list with custom controller
    .state('about.list', {
        url: '/list',
		templateUrl: '2.html',
        controller:'Cntrl2'
		})

    // nested list with just some random string data
    .state('about.paragraph', {
        url: '/paragraph',
		templateUrl: '3.html',
		controller:'Cntrl3'

    })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
        url: '/about',
		templateUrl: '4.html',
        controller: 'Cntrl4'
	
        
    })

	.state('profile',{
		url:'/profile',
					templateUrl:'5.html',
					controller:'Cntrl5'
			/*
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: '3.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@about': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@about': { 
                templateUrl: '5.html',
                controller: 'scotchController'
            }
			
        }*/
	});
}); 
// closes $routerApp.config()



