var buildingCharacteristicsComponent = angular.module('buildingCharacteristicsModule', ['property']);
buildingCharacteristicsComponent.component('buildingcharacteristics',
{
	templateUrl: 'Property/Tabs/building/characteristics.html',
	controller: ['$stateParams', '$state', 'propertyService', function ($stateParams, $state, propertyService) {
	    var vm = this;
	    vm.propertyId = $stateParams.id;
	    vm.buildingId = $stateParams.buildingid;
	    vm.selectedIndex = null;
		vm.showPopup = false;

	    vm.selectRow = function(index){
	    	vm.selectedIndex = index;
	    };

	    vm.addRow = function(){
	    	vm.showPopup = true;
	    }

	    vm.editRow = function() {
	    	console.log('editRow');
	    };

	    vm.removeRow = function() {
	    	vm.building.BuildingCharacteristics.splice(vm.selectedIndex, 1);
	    	vm.selectedIndex = null;
	    };

	    vm.updateNotes = function(){
    		vm.notes = [];
    		for(var i = 0; i < vm.availableNotes.length; i++){
    			if(vm.availableNotes[i].description == vm.newDescription){
    				vm.notes.push(vm.availableNotes[i]);
    			}
    		}
    		vm.newNote = vm.notes[0];
	    };

	    vm.saveNewCharacteristic = function(){
	    	console.log(vm.newNote);

	    	var newCharac = {
	    		Code: vm.newNote.code,
	    		Description: vm.newNote.description,
	    		Note: vm.newNote.note,
	    		Percentage: vm.newPercentage
	    	};
	    	vm.building.BuildingCharacteristics.push(newCharac);
	    	vm.showPopup = false;
	    	vm.newPercentage = 0;
	    };

    	var init = function(){
    		propertyService.getBuilding(vm.propertyId, vm.buildingId)
            .then(
            	function (result) {
                	vm.building = result;
            	}
        	);
        	setDescription();
        	setAvailableNotes();

        	vm.newDescription = vm.descriptions[0];
        	vm.updateNotes();

    	}
        
        var setDescription = function(){
		    vm.descriptions = [
		    	'Heat/AC',
				'Architectural Style',
				'Condition',
				'Exterior Wall',
				'Interior Flooring',
				'Interior Walls',
				'Plumbing',
				'Quality Adj',
				'Roof Cover',
				'Roof Structure'];
		};

		var setAvailableNotes = function(){
			vm.availableNotes = [{description:'Heat/AC',	tp:'AC',  	code:0,	note:'None'}
				,{description:'Heat/AC',	tp:'AC',  	code:1,	note:'Non-Ducted'}
				,{description:'Heat/AC',	tp:'AC',  	code:2,	note:'Central'}
				,{description:'Architectural Style',	tp:'AR',  	code:0,note:'Not Assigned'}
				,{description:'Architectural Style',	tp:'AR',  	code:1,note:'Pre-1940 Commercial'}
				,{description:'Architectural Style',	tp:'AR',  	code:2,note:'Updated Basic 1-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:3,note:'Mansion'}
				,{description:'Architectural Style',	tp:'AR',  	code:4,note:'Basic 1-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:5,note:'Contemporary 1-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:6,note:'Pre-1940 1-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:7,note:'Unique Design'}
				,{description:'Architectural Style',	tp:'AR',  	code:8,note:'Basic Multi-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:9,note:'Pre-1940 Multi-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:10,note:'Contemporary Multi-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:11,note:'Updated Basic Multi-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:12,note:'Updated Pre-1940 Commercial'}
				,{description:'Architectural Style',	tp:'AR',  	code:13,note:'Updated Mansion'}
				,{description:'Architectural Style',	tp:'AR',  	code:14,note:'Updated Contemporary 1-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:15,note:'Updated Pre-1940 1-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:16,note:'Updated Unique Design'}
				,{description:'Architectural Style',	tp:'AR',  	code:17,note:'Updated Pre-1940 Multi-Story'}
				,{description:'Architectural Style',	tp:'AR',  	code:18,note:'Updated Contemporary Multi-Story'}
				,{description:'Condition',	tp:'CN', 	code:1,	note:'Poor'}
				,{description:'Condition',	tp:'CN', 	code:2,	note:'Fair'}
				,{description:'Condition',	tp:'CN', 	code:3,	note:'Average'}
				,{description:'Condition',	tp:'CN', 	code:4,	note:'Good'}
				,{description:'Condition',	tp:'CN',  code:	5,note:	'Excellent'}
				,{description:'Exterior Wall',	tp:'EW',code:0	,note:'None'}
				,{description:'Exterior Wall',	tp:'EW',code:1	,note:'Minimum/Wall Board/Corr. Mtl'}
				,{description:'Exterior Wall',	tp:'EW',code:2	,note:'Asbestos Siding'}
				,{description:'Exterior Wall',	tp:'EW',code:3	,note:'Miscellaneous'}
				,{description:'Exterior Wall',	tp:'EW',code:4	,note:'Wood/Masonry Siding'}
				,{description:'Exterior Wall',	tp:'EW',code:5	,note:'Concrete Block'}
				,{description:'Exterior Wall',	tp:'EW',code:6	,note:'Wd/Mtl Frm: Stucco'}
				,{description:'Exterior Wall',	tp:'EW',code:7	,note:'Masonry Frm: Stucco'}
				,{description:'Exterior Wall',	tp:'EW',code:8	,note:'Brick'}
				,{description:'Exterior Wall',	tp:'EW',code:9	,note:'Stone'}
				,{description:'Exterior Wall',	tp:'EW',code:10,note:'Precast Panel'}
				,{description:'Exterior Wall',	tp:'EW',code:11,note:'Reinforced Concrete'}
				,{description:'Exterior Wall',	tp:'EW',code:12,note:'Metal'}
				,{description:'Exterior Wall',	tp:'EW',code:13,note:'Alum/Vinyl Siding'}
				,{description:'Exterior Wall',	tp:'EW',code:14,note:'Plate Glass'}
				,{description:'Exterior Wall',	tp:'EW',code:15,note:'Glass Thermopane'}
				,{description:'Interior Flooring',tp:'IF',code: 0,note:'None'}
				,{description:'Interior Flooring',tp:'IF',code: 1,note:'Minimum'}
				,{description:'Interior Flooring',tp:'IF',code: 2,note:'Concrete Finished'}
				,{description:'Interior Flooring',tp:'IF',code: 3,note:'Concrete Above Grade'}
				,{description:'Interior Flooring',tp:'IF',code: 4,note:'Vinyl'}
				,{description:'Interior Flooring',tp:'IF',code: 5,note:'Wood'}
				,{description:'Interior Flooring',tp:'IF',code: 6,note:'Terrazzo'}
				,{description:'Interior Flooring',tp:'IF',code: 7,note:'Tile'}
				,{description:'Interior Flooring',tp:'IF',code: 8,note:'Carpet'}
				,{description:'Interior Flooring',tp:'IF',code: 9,note:'Precast Concrete'}
				,{description:'Interior Flooring',tp:'IF',code: 10,note:'Slate/Travertine'}
				,{description:'Interior Flooring',tp:'IF',code: 11,note:'Marble'}
				,{description:'Interior Walls',tp:'IW',code:0,note:'None'}
				,{description:'Interior Walls',tp:'IW',code:1,note:'Masonry or Minimum'}
				,{description:'Interior Walls',tp:'IW',code:2,note:'Wall Board/Wood Wall'}
				,{description:'Interior Walls',tp:'IW',code:3,note:'Plaster'}
				,{description:'Interior Walls',tp:'IW',code:4,note:'Plywood paneling'}
				,{description:'Interior Walls',tp:'IW',code:5,note:'Drywall'}
				,{description:'Interior Walls',tp:'IW',code:6,note:'Wood Panel or Custom'}
				,{description:'Interior Walls',tp:'IW',code:7,note:'Decorative Wall Cov.'}
				,{description:'Plumbing',tp:'PL',code:0,note:'None'}
				,{description:'Plumbing',tp:'PL',code:1,note:'Minimum'}
				,{description:'Plumbing',tp:'PL',code:2,note:'Below Average'}
				,{description:'Plumbing',tp:'PL',code:3,note:'Typical'}
				,{description:'Plumbing',tp:'PL',code:4,note:'Above Average'}
				,{description:'Plumbing',tp:'PL',code:5,note:'Maximum'}
				,{description:'Quality Adj',tp:'QA',code:0,note:'Minimum'}
				,{description:'Quality Adj',tp:'QA',code:1,note:'Fair'}
				,{description:'Quality Adj',tp:'QA',code:2,note:'Average -'}
				,{description:'Quality Adj',tp:'QA',code:3,note:'Average'}
				,{description:'Quality Adj',tp:'QA',code:4,note:'Average +'}
				,{description:'Quality Adj',tp:'QA',code:5,note:'Good'}
				,{description:'Quality Adj',tp:'QA',code:6,note:'Excellent'}
				,{description:'Quality Adj',tp:'QA',code:7,note:'Superior'}
				,{description:'Roof Cover',tp:'RC',code:0,note:'None'}
				,{description:'Roof Cover',tp:'RC',code:1,note:'Minimum'}
				,{description:'Roof Cover',tp:'RC',code:2,note:'Rolled Composition'}
				,{description:'Roof Cover',tp:'RC',code:3,note:'Asphalt/Comp. Shingle'}
				,{description:'Roof Cover',tp:'RC',code:4,note:'Blt.up Tar & Gravel'}
				,{description:'Roof Cover',tp:'RC',code:5,note:'Asbestos'}
				,{description:'Roof Cover',tp:'RC',code:6,note:'Tile'}
				,{description:'Roof Cover',tp:'RC',code:7,note:'Wood Shingle'}
				,{description:'Roof Cover',tp:'RC',code:8,note:'Slate'}
				,{description:'Roof Cover',tp:'RC',code:9,note:'Metal'}
				,{description:'Roof Cover',tp:'RC',code:10,note:'Copper'}
				,{description:'Roof Cover',tp:'RC',code:11,note:'Exceptional'}
				,{description:'Roof Cover',tp:'RC',code:12,note:'Rubber or Plastic'}
				,{description:'Roof Structure',tp:'RS',code:0,note:'None'}
				,{description:'Roof Structure',tp:'RS',code:1,note:'Flat'}
				,{description:'Roof Structure',tp:'RS',code:2,note:'Shed'}
				,{description:'Roof Structure',tp:'RS',code:3,note:'Gable or Hip'}
				,{description:'Roof Structure',tp:'RS',code:4,note:'Truss (Wood/Metal)'}
				,{description:'Roof Structure',tp:'RS',code:5,note:'Sawtooth'}
				,{description:'Roof Structure',tp:'RS',code:6,note:'Mansard'}
				,{description:'Roof Structure',tp:'RS',code:7,note:'Gambrel'}
				,{description:'Roof Structure',tp:'RS',code:8,note:'Irregular'}
				,{description:'Roof Structure',tp:'RS',code:9,note:'Rigid Frame/Barjoist'}
				,{description:'Roof Structure',tp:'RS',code:10,note:'Steel Frame'}
				,{description:'Roof Structure',tp:'RS',code:11,note:'Bowstring Truss'}
				,{description:'Roof Structure',tp:'RS',code:12,note:'Reinforced Concrete'}
				,{description:'Roof Structure',tp:'RS',code:13,note:'Prestress Concrete'}
				];
		}

		init();
}]
});