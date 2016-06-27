/* Services */
angular.module('statusQuotesServices', [])

/* Manage Category */
.service("Category", function($http, $q, $log, Cache) {
	return {

		loadCategories: function() {
			//console.log('Load Categories From Filesystem');
			return $http.get('files/category.json');
		},
		getCategories: function() {
			var deferred = $q.defer();
			var key = C_CACHE_CATEGORY;
			var categories = Cache.get(key);
			if(!categories) {
				var promise = this.loadCategories();
	       		promise.then(
	          		function(payload) { 
	              		categories = payload.data;
						if(categories) {
							Cache.put(key, categories);
						}
	              		deferred.resolve({categories: categories});
						//console.log('Categories ' + JSON.stringify(categories));
	          		},
	          		function(errorPayload) {
	          			$log.debug('Failure loading categories ' + errorPayload);
	          			deferred.reject(errorPayload);
	          		});
			} else {
				deferred.resolve({categories: categories});
			}
			return deferred.promise;
		},
		collectCategory: function(catID) {
			var key = C_CACHE_CATEGORY;
			var categories = Cache.get(key);
			var category = {};
			if(categories) {
				category = _.find(categories, function(ctgry) { 
					//return ctgry.id == catID; 
					//FIXME - find the right category
					return true;
				});
			} 
			return category;
		} 

	};
})

/* Perform Operation for Storage Sync */
.service("Storage", function($http, $log) {

	return {
		sync:function() {

			var self = this;
			var uri = encodeURI(C_URL);
			var lastSyncTime = window.localStorage.getItem(C_KEY_SYNCTIME);
			if(lastSyncTime) {
				lastSyncTime = lastSyncTime - 18000;
				uri = encodeURI(C_URL + "&ts=" + lastSyncTime);
			} 
			$log.debug("Download URL : " + uri);

			$http.get(uri)
    			.then(function(response) {
    				$log.debug("Fresh Data - " + JSON.stringify(response.data));
    				self.updateStorage(response.data);
    			}, function(response) {
					$log.error("Sync Kuripugal Failed - " + response);
					//FIXME - Send report to Analytics
    			});			
		},
		updateStorage:function(data) {
			var localQuotes =  window.localStorage.getItem(C_KEY_QUOTES);
			if(localQuotes) {
				this.syncStorage(data);
				//window.analytics.trackEvent('Local Storage', 'Synced');
			} else {
				window.localStorage.setItem(C_KEY_QUOTES, JSON.stringify(data.quotes));
				window.localStorage.setItem(C_KEY_SYNCTIME, data.time);
				//FIXME - Track event in Analytics
				//window.analytics.trackEvent('Local Storage', 'Initialized');
				//console.log('Stored Kuripugal');
			}
		},		
		syncStorage:function(data) {
			$log.debug("Sync Storage");
		/*	
			console.log('Sync Local Storage');
			var localKuripugal =  window.localStorage.getItem(C_KEY_KURIPPU);
			var localKurippuJSON = JSON.parse(localKuripugal);
			var initialKurippuSize = _.size(localKurippuJSON);
			//console.log("Modified Array Size : " + _.size(data.recipie));		
			//console.log("Local Array Initial Size : " + initialKurippuSize);		

			if(_.size(data.recipie) >  0) {
				$.each(data.recipie, function(key, item) {
					var newKurippu = true;
					_.find(localKurippuJSON,function(rw, rwIdx) { 
						if(rw.id == item.id) { 
							//console.log ("Replace Existing Object for : " + item.id); 
							localKurippuJSON[rwIdx] = item;
							newKurippu = false; 
							return true;
						}; 
					});
					//If new tip
					if(newKurippu) {
						//console.log("New Object for : " + key + " - " + JSON.stringify(item));
						//console.log("New Object for : " + key + " - " + item.id);
						item.new = true;
						localKurippuJSON.push(item);
					} 
				});
				var finalKurippuSize = _.size(localKurippuJSON);
				//console.log("Local Array Final Size : " + finalKurippuSize);		
				//Update Local storage only if new array is bigger or equal to current array size
				if(finalKurippuSize >= initialKurippuSize) {
					window.localStorage.setItem(C_KEY_QUOTES, JSON.stringify(localKurippuJSON));
					var modifiedTime = data.time;
					if(typeof modifiedTime != 'undefined') {
						window.localStorage.setItem(C_KEY_SYNCTIME, modifiedTime);
					}
				}
			}
		
		*/
		}
	};

})

/* Operations for collecting data  */
.service("Quotes", function($http, $log, Cache) {

	return {
		getQuotes:function(ctgry) {
			var quotes = this.getCacheQuotes();
			var catArr = null;
			var catQuotes = null;

			//Filter Category Quotes
			if(ctgry > 0) {
				 $log.debug("Find Quotes for Category : " +  ctgry);
				 catQuotes = _.filter(quotes, function(item) {  
					var bCtgryMatch = false;
					for (var j = 0, length = item.category.length; j < length; j++) {
						$log.debug("Category for recipie : " + item.category[j]);
						if(ctgry == item.category[j]) {
							bCtgryMatch = true;
						}
					}
					return bCtgryMatch; 
				})
			} else {
				catQuotes = quotes;
			} 
			
			/*
			//Mark Favourites 
			var arrFavourites = Favourite.getFavourites();
			//console.log("User Favourites : " + arrFavourites);
			if(_.size(arrFavourites) > 0) {
				_.each(pirivuRecipie, function(item) {  
					//console.log("Compare for Favourite : " + item.id + " - " + arrFavourites);	
					if(_.contains(arrFavourites, "" + item.id)) {
						item.fav = true;
						//console.log("Favourite Found : " + item.title);	
					}
				});
			} 

			//Sort Recipies by post date
			if(_.size(arrFavourites) > 0) {
				pirivuRecipie = _.sortBy(pirivuRecipie, function(item) {
					return -item.post_date; 
				})
			}
			*/
				 
			return catQuotes;

		},
		/*
		getRecipie:function(recid) {
			//FIXME - Later collect it from cache
			var data =  window.localStorage.getItem(C_KEY_KURIPPU);
			var jsonData = JSON.parse(data);
			//console.log("Recipie Count : " + _.size(jsonData));
			var recipie = _.find(jsonData,function(rw, rwIdx) { 
				if(rw.id == recid) { 
					//console.log ("Recipie found for : " + recid); 
					return true;
				}; 
			});
			//console.log('Collect Recipie Detail : ' + recipie);
			return recipie;
		},
		*/
		getStorageQuotes:function() {
			var data =  window.localStorage.getItem(C_KEY_QUOTES);
			if(!data) {
				//FIXME - Try to capture device id in Analytics
			}
			return JSON.parse(data);
		},
		getCacheQuotes:function() {
			var cacheQuotes = Cache.get(C_CACHE_QUOTES);
			if(!cacheQuotes) {
				cacheQuotes= this.getStorageQuotes();
				if(cacheQuotes) {
					Cache.put(C_CACHE_QUOTES, cacheQuotes);
				}
			} else {
				$log.debug("Returning Quotes from cache");
			}
			return cacheQuotes;
		}
	};

})

; 

/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('Cache', function ($cacheFactory) {
	return $cacheFactory('cache-quotes');
});
