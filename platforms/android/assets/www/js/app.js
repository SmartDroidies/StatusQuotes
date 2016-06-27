'use strict';

/* App Module */
angular.module('statusQuotesApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngMaterial', 'statusQuotesControllers','statusQuotesServices', 'cacheService'])
.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl' 
			}).
      when('/quotes/:cat', {
        templateUrl : 'partials/quotes.html',
        controller : 'QuotesCtrl'
      }).
      /*
      when('/list', {
        templateUrl : 'partials/list.html',
        controller : 'QuoteListCtrl'
      }).
      when('/quote/:cat/:index', {
        templateUrl : 'partials/quote.html',
        controller : 'QuoteCtrl'
      }).
      when('/quote/:id', {
        templateUrl : 'partials/quote.html',
        controller : 'QuoteCtrl'
      }).
*/
			otherwise({
				redirectTo : '/home'
			});
		}
	])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default') 
    .primaryPalette('orange')
    .accentPalette('pink')
})
.run(function($rootScope, $location) {

  //Share App
    $rootScope.share = function () {   
      window.analytics.trackEvent('Setting', 'App Share');    
      window.plugins.socialsharing.share('Tamil Samayal kuripugal - A complete cooking guide free on Android', 'Tamil Samayal kuripugal', null, 'https://play.google.com/store/apps/details?id=com.career.wrap.tamil.samayal');
    }

    //Rate US
    $rootScope.rateus = function () {        
      window.analytics.trackEvent('Setting', 'Rate Us');    
      var url = "market://details?id=com.career.wrap.tamil.samayal";
      window.open(url,"_system");   
    };  

    //Feedback
    $rootScope.feedback = function () {        
      window.analytics.trackEvent('Setting', 'Feedback');    
      //FIXME - Collect version from app 
      window.plugin.email.open({
       to:      ['tips2stayhealthy@gmail.com'],
       subject: 'Feedback on Tamil Samyal Kuripugal',
       body:    '',
       isHtml:  true
      });
    };

    //Recipies
    $rootScope.recipie = function (piruvu) {        
        var newpath = "/recipies/" + piruvu;
      $location.path(newpath); 
    };  

    //Go Back
    $rootScope.back = function () {        
      window.history.back();
    };  

});


/*
//ng-i18next - use i18next with Angularjs
angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
    $i18nextProvider.options = {
        lng: 'ta',
        useCookie: false,
        useLocalStorage: false,
        fallbackLng: 'en',
        resGetPath: 'locales/__lng__/__ns__.json',
        defaultLoadingValue: '' // ng-i18next option, *NOT* directly supported by i18next
    };
}]);
*/