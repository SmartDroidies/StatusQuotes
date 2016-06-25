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
		}
	};
}); 


/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('Cache', function ($cacheFactory) {
	return $cacheFactory('cache-quotes');
});
