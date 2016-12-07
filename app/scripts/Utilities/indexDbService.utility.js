angular.module('utilities')
	.factory('indexDBUtility', function($window, $q){
		var factory = {};
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var setUp = false;
		var db = null;
		var version = 5;
		var dbName = "mobileAppraiserData";
		var objectStores = [];
		
		var propertiesStore = {name: "properties", properties: {keyPath: "Id"}, indexes: []};
		propertiesStore.indexes.push({name: "Completed", column: "Completed", properties: {unique: false}});
		objectStores.push(propertiesStore);

		var imageStore = {name: "images", properties: {keyPath: "id", autoIncrement:true}, indexes: []};
		imageStore.indexes.push({name: "propertyId", column: "propertyId", properties: {unique: false}});
		objectStores.push(imageStore);

		var sketchStore = {name: "sketches", properties: {keyPath: ["propertyId", "buildingId"]}, indexes: []};
		sketchStore.indexes.push({name: "propertyId", column: "propertyId", properties: {unique: false}});
		sketchStore.indexes.push({name: "propertyBuilding", column: ["propertyId", "buildingId"], properties: {unique: true}});
		objectStores.push(sketchStore);
		
		var dbOpenPromise;

		//PRIVATE METHODS
	  	var getCursorResults = function(cursor, list){
	  		var deferred = $q.defer();
	  		if(cursor){
				list.push(cursor.primaryKey);
				deferred.resolve(cursor);
			}
			else{
				console.log(e);
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
			   		dbOpenPromise.reject(e.toString());
			   	};

			    openRequest.onupgradeneeded = function(e){
			    	console.log('onupgradeneeded');
			    	// var req = window.indexedDB.deleteDatabase(dbName);
			    	var thisDb = e.target.result;
			    	var transaction = e.target.transaction;
			    	for (var j = 0; j < objectStores.length; j++){
						if(thisDb.objectStoreNames.contains(objectStores[j].name)){
				 			var objectStore = transaction.objectStore(objectStores[j].name);
				 			objectStore.clear();
				 		}
					}

			    	for (var i = 0; i < objectStores.length; i++){

		    			createObjectStore(thisDb, objectStores[i]);
			    	}
			    };
			  
			    openRequest.onsuccess = function(e) {
		      		db = e.target.result;
	            
		            db.onerror = function(event) {
		                // Generic error handler for all errors targeted at this database's
		                // requests!
		                //console.log(e);
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
					var trans = db.transaction(store, "readwrite");
					var objectStore = trans.objectStore(store);
					var request = objectStore.add(value);

					request.onsuccess = function(e){
					    deferred.resolve();
					}

					request.onerror = function(e){
					    deferred.reject(e);
					}
				}
			},
			function(e){
				//console.log(e);
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
					var trans = db.transaction(store, "readwrite");
					var objectStore = trans.objectStore(store);
					var request = objectStore.put(value);

					request.onsuccess = function(e){
					    deferred.resolve(value);
					}

					request.onerror = function(e){
					    deferred.reject(e);
					}
				}
			},
			function(e){
				console.log(e);
				deferred.reject(e);
			}
		);

		return deferred.promise;
	  }

	  factory.get = function(store, id) {

	  	var deferred = $q.defer();
	  	factory.open().then(
	  		function(){
			  	var trans = db.transaction(store, "readwrite");
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
				console.log(e);
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
			  	var trans = db.transaction(store, "readwrite");
				var objectStore = trans.objectStore(store);
				var storeIndex = objectStore.index(index);
				
				storeIndex.openKeyCursor(IDBKeyRange.only(value))
				.onsuccess = function(e){
					var cursor = e.target.result;

					if(cursor) {
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

				var trans = db.transaction(store);
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
				console.log(e);
				deferred.reject(e);
			}
		);
	  	return deferred.promise;
	  }

	  factory.exists = function(store, id){
	  	var deferred = $q.defer();
	  	factory.open().then(
	  		function(){
			  	var trans = db.transaction(store, "readwrite");
				var objectStore = trans.objectStore(store);

				var request = objectStore.get(id);
			  	
			  	request.onerror = function(e){
			  		//console.log(e);
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
				console.log(e);
				deferred.reject(e);
			}
		);

	  	return deferred.promise;
	  }

	  factory.delete = function(store, id){
	  	var deferred = $q.defer();
	  	factor.open().then(
	  		function(){
	  			var trans = db.transaction(store, "readwrite");
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
	  			console.log(e);
	  			deferred.reject(e);
	  		}
  		);

  		return deferred.promise;
	  }

	  return factory;
});