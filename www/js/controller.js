'use strict';

/* Controllers */
angular.module('statusQuotesControllers', [])

.controller('HomeCtrl', function($scope, $rootScope, $log, Category) {
	
	$scope.displayHome = function () {    
		if($rootScope.tab == 1) { 
			$scope.displayCategories();
		} else if ($rootScope.tab == 2) {
			//$scope.favourite = Quote.collectFavourites();	
		} else if ($rootScope.tab == 3) {
			//$scope.newtips = Article.collectNewTips();
		} 	
	};

	//Display Category
	$scope.displayCategories = function() {
		$log.debug("Display Categories");
		var promise =  Category.getCategories();
		promise.then (
  			function(data) {
			 	$scope.categories = data.categories;
			 	$log.debug("Categories : " + $scope.categories);
  			},
  			function(error) {
    			$log.error('No Categories Found.');
  			});
	}

	/*
	$scope.showList = function () {       
		window.plugins.spinnerDialog.show();
    	console.log('Show List');
    	window.plugins.spinnerDialog.hide();
	};

	//Display Articles Category
	$scope.ctgryView = function() {
		$scope.displayCategories();
		$rootScope.tab = 1;
    };

	//Display Favourite Articles
	$scope.favouriteView = function() {
		$scope.favourite = Quote.collectFavourites();
		console.log("Favourites : " + $scope.favourite.length);
		$rootScope.tab = 2;
    };

    //Display Quote
	$scope.displayQuote = function (quoteId) {
		//console.log('Params : ' + quoteId );
		$location.path('/quote/' + quoteId);  
	};

    //Display Quote List
	$scope.quotes = function (categoryId) {
		//console.log('Params : ' + categoryId );
		$location.path('/quotes/' + categoryId);  
	};

	//Set Default Tab to Category Listing
	if(!$rootScope.tab) {
		$rootScope.tab = 1;
	} 

	//Sync Local Data
	if(!$rootScope.synced) {
		//console.log("Requesting for Sync");
		StorageService.syncDate();
		$rootScope.synced = true;
	}
	*/

	//Show Home
	$scope.displayHome();
  }
);
