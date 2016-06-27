'use strict';

/* Controllers */
angular.module('statusQuotesControllers', [])

.controller('HomeCtrl', function($scope, $rootScope, $log, $location, Category, Storage) {
	
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
		var promise =  Category.getCategories();
		promise.then (
  			function(data) {
			 	$scope.categories = data.categories;
			 	//$log.debug("Categories : " + JSON.stringify($scope.categories));
  			},
  			function(error) {
    			$log.error('No Categories Found');
  			});
	};

    //Display Quote List
	$scope.quotes = function (categoryId) {
		$location.path('/quotes/' + categoryId);  
	};

	//Sync Quotes from Server
  	if(!$rootScope.synced) {
    	$log.debug("Syncing Quotes From Server");
    	Storage.sync();
    	$rootScope.synced = true;
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
)

//Quotes List Controller
.controller('QuotesCtrl', function($scope, $location, $routeParams, $log, Quotes, Category /*, Favourite, RecipieList */ ) {

    $scope.listQuotes = function (ctgry) { 
    	//$log.debug("Display quotes for : " + ctgry);
    	var category = Category.collectCategory(ctgry);
    	if(category) {
    		//$log.debug("Category : " + JSON.stringify(category));
    		$scope.category = category;
    	} else {
    		//FIXME - Handle Emtry Category Desctiprion
    	}
    	$scope.quotes = Quotes.getQuotes(ctgry);
      	//Store the latest recipie list for navigation
      	//RecipieList.update($scope.recipies);
      	//FIXME Analytics for Listing Event
    }

	/*
    //Display Recipie Details
    $scope.detail = function (id) {        
      //console.log("Display Recipie : " + id);
      var newpath = "/recipie/detail/" + id;
      $location.path(newpath); 
    }  

    //Add Recipie to favourite
    $scope.favourite = function (recipie) {        
      //console.log("Mark Recipie Favourite : " + recipie.id);
      Favourite.markFavourite(recipie.id);
      recipie.fav = true;
      //FIXME  - Display a toast message
    }  

    //Remove Recipie from favourite
    $scope.unfavourite = function (recipie) {        
      //console.log("UnMark Recipie Favourite : " + recipie.id);
      Favourite.unmarkFavourite(recipie.id);
      recipie.fav = false;
      //FIXME  - Display a toast message
    }  

    //List only favourites
    $scope.viewFavourites = function (recipie) {        
      var pirivuRecipes = Recipie.getRecipies($scope.pirivu); 
      var favourRecipies = _.filter(pirivuRecipes, function(item) {  
          //console.log(item.title + " - " + item.fav);
          return item.fav; 
      });
      $scope.recipies = favourRecipies;
      $scope.favourites = true;
      //FIXME  - Display a toast message
    }  

    //List only favourites
    $scope.viewDefault = function (recipie) {        
      $scope.recipies = Recipie.getRecipies($scope.pirivu); 
      $scope.favourites = false;
      //FIXME  - Display a toast message
    }  

    //Set Search Mode 
    $scope.search = function () {        
      $scope.searchmode = true; 
    }  

    //Set Search Mode 
    $scope.closeSearch = function () {        
      $scope.searchmode = false; 
    } 
    */ 

    var ctgry =  $routeParams.cat;
    $scope.listQuotes(ctgry);

})
;
