angular.module('indexDB',[])
	.factory('indexDBService', function($window, $q){
		var factory = {};
		var indexedDB = $window.indexDB;
		var setUp = false;
		var db = null;
		var version = 1;
		var dbName = "mobileAppraiserData";

		var propertiesStore = {name: "properties", properties: {keyPath: "Pin"}, indexes: []};
		propertiesStore.indexes.push({name: "Completed", column: "Completed", properties: {unique: false}});

		var imageStore = {name: "images", properties: {keyPath: "id", autoIncrement:true}, indexes: []};
		imageStore.indexes.push({name: "propertyId", column: "propertyId", properties: {unique: false}});
		var objectStores = [];

		objectStores.push(propertiesStore);
		objectStores.push(imageStore);

		var dbOpenPromise;

		//PRIVATE METHODS
	  	var getCursorResults = function(cursor, list){
	  		var deferred = $q.defer();
	  		if(cursor){
				list.push(cursor.primaryKey);
				deferred.resolve(cursor);
			}
			else{
				deferred.reject();
			}
	  		return deferred.promise;
	 	}

	 	var createObjectStoreIndex = function(objectStore, index){
 			objectStore.createIndex(index.name, index.column, index.properties);
	 	}

	 	var createObjectStore = function(db, objectStore){
	 		if(!db.objectStoreNames.contains(objectStore.name)) {
				var newObjectStore = db.createObjectStore(objectStore.name, objectStore.properties);

				for(var i = 0; i < objectStore.indexes.length; i++){
					createObjectStoreIndex(newObjectStore, objectStore.indexes[i]);
				}
			}
	 	}

	 	//PUBLIC METHODS
		factory.open = function() {


			if(!dbOpenPromise) {
		    	dbOpenPromise = $q.defer();

			    if(setUp){
			    	dbOpenPromise.resolve(true);
			    	return dbOpenPromise.promise;
			    }

			    var openRequest = window.indexedDB.open(dbName, version);

			   	openRequest.onerror = function(e){
			   		console.log("Error opening db", e);
			   		dbOpenPromise.reject(e.toString());
			   	};

			    openRequest.onupgradeneeded = function(e){
			    	var thisDb = e.target.result;

			    	for (var i = 0; i < objectStores.length; i++){
		    			createObjectStore(thisDb, objectStores[i]);
			    	}
			    };
			  
			    openRequest.onsuccess = function(e) {
		      		db = e.target.result;
	            
		            db.onerror = function(event) {
		                // Generic error handler for all errors targeted at this database's
		                // requests!
		            	dbOpenPromise.reject("Database error: " + event.target.errorCode);
		            };
	    
		            setUp=true;
		            dbOpenPromise.resolve(true);
				};

		    	dbOpening = false;
			}
		    return dbOpenPromise.promise;
	  };

	  factory.add = function(store, value) {
	  	var deferred = $q.defer();

	  	factory.open().then(
	  		function(){

				if (db === null){
					deferred.reject("indexDB is not open");
				}
				else {
					var trans = db.transaction([store], "readwrite");
					var objectStore = trans.objectStore(store);
					var request = objectStore.add(value);

					request.onsuccess = function(e){
					    deferred.resolve();
					}

					request.onerror = function(e){
						console.log(e);
					    deferred.reject(e);
					}
				}
			},
			function(e){
				deferred.reject(e);
			}
		);

		return deferred.promise;
	  }

	  factory.put = function(store, value) {
		var deferred = $q.defer();
		factory.open().then(
			function(){

				if (db === null){
					deferred.reject("indexDB is not open");
				}
				else {
					var trans = db.transaction([store], "readwrite");
					var objectStore = trans.objectStore(store);
					var request = objectStore.put(value);

					request.onsuccess = function(e){
					    deferred.resolve();
					}

					request.onerror = function(e){
						console.log(e);
					    deferred.reject(e);
					}
				}
			},
			function(e){
				deferred.reject(e);
			}
		);

		return deferred.promise;
	  }

	  factory.get = function(store, id) {

	  	var deferred = $q.defer();
	  	factory.open().then(
	  		function(){
			  	var trans = db.transaction([store], "readwrite");
				var objectStore = trans.objectStore(store);

				var request = objectStore.get(id);
			  	
			  	request.onerror = function(e){
			  		console.log(e);
			  		deferred.reject(e.toString());
			  	}

			  	request.onsuccess = function(e){
		  			if(e.target.result) {
		  				deferred.resolve(e.target.result);
		  			} else {
						deferred.reject('unable to find value from store: ' + store + ' with id: ' + id);
		  			}
			  	}
			},
			function(e){
				deferred.reject(e);
			}
		);

	  	return deferred.promise;
	  }


	  factory.getByIndex = function(store, index, value){
		var deferred = $q.defer();
	  	factory.open().then(
	  		function(){
	  			var results = [];
			  	var trans = db.transaction([store], "readwrite");
				var objectStore = trans.objectStore(store);
				var storeIndex = objectStore.index(index);
				
				storeIndex.openKeyCursor(IDBKeyRange.only(value))
				.onsuccess = function(e){
					var cursor = e.target.result;

					if(cursor){
						results.push(cursor.primaryKey);
						cursor.continue();
					}
					else {
						deferred.resolve(results);
					}
				}
			}
		);

	  	return deferred.promise;
	  }

	  factory.getAll = function(store) {
	  	var deferred = $q.defer();
	  	factory.open().then(
	  		function(){

				var trans = db.transaction([store]);
				var objectStore = trans.objectStore(store);
				var request = objectStore.getAll();

			  	request.onerror = function(e){
			  		console.log(e);
			  		deferred.reject(e.toString());
			  	}

			  	request.onsuccess = function(e){
					deferred.resolve(e.target.result);
			  	}
			},
			function(e){
				deferred.reject(e);
			}
		);
	  	return deferred.promise;
	  }

	  factory.exists = function(store, id){
	  	var deferred = $q.defer();
	  	factory.open().then(
	  		function(){
			  	var trans = db.transaction([store], "readwrite");
				var objectStore = trans.objectStore(store);

				var request = objectStore.get(id);
			  	
			  	request.onerror = function(e){
			  		console.log(e);
			  		deferred.reject(e.toString());
			  	}

			  	request.onsuccess = function(e){
		  			if(e.target.result) {
		  				deferred.resolve(true);
		  			} else {
						deferred.resolve(false);
		  			}
			  	}
			},
			function(e){
				deferred.reject(e);
			}
		);

	  	return deferred.promise;
	  }

	  factory.delete = function(store, id){
	  	var deferred = $q.defer();
	  	factor.open().then(
	  		function(){
	  			var trans = db.transaction([store], "readwrite");
	  			var objectStore = trans.objectStore(store);

	  			var request = objectStore.delete(id);

	  			request.onerror = function(e){
	  				console.log(e);
	  				deferred.reject(e.toString());
	  			}

	  			request.onsuccess = function(){
	  				deferred.resolve();
	  			}
	  		},
	  		function(e){
	  			deferred.reject(e);
	  		}
  		);

  		return deferred.promise;
	  }

	  return factory;
});