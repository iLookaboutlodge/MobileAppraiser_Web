var buildingDetailsComponent = angular.module('buildingDetailsModule', ['property']);
buildingDetailsComponent.component('buildingdetails',
{
	templateUrl: 'Property/Tabs/building/details.html',
	controller: ['$stateParams', '$state', 'propertyService', function ($stateParams, $state, propertyService) {

	    var vm = this;
	    vm.propertyId = $stateParams.id;
	    vm.buildingId = $stateParams.buildingid;

	     propertyService.getBuilding(vm.propertyId, vm.buildingId)
            .then(
            	function (result) {
                	vm.building = result;
            	}
        	);

    	vm.classes = [
    		"A  - Structural Steel Columns & Beams",
			"B  - Reinforced Concrete Columns and Beams",
			"C  - Masonry or Concrete Frame",
			"D  - Wood Frame",
			"N  - NONE",
			"S  - Metal Frame"];

		vm.styles = [
			'01  - RESIDENTIAL',
			'02  - MOBILE HOME',
			'03  - M-FAM < 10 UNITS',
			'04  - COMMERCIAL BLDGS',
			'05  - APARTMENTS',
			'06  - INDUSTRIAL',
			'07  - HOTEL/MOTEL'
		];

		vm.qualities = [
			'0 - Minimum',
			'1 - Fair',
			'2 - Average -',
			'3 - Average',
			'4 - Average +',
			'5 - Good',
			'6 - Excellent',
			'7 - Superior'
		];


		vm.types = [
			'**** - GLOBAL TYPE',
			'00  - NOT CALCULATING',
			'01  - SINGLE FAMILY',
			'02  - MANUFACTURED HOME (AYB > 1976)',
			'06  - RENTAL UNIT',
			'08  - MOBILE HOME (AYB < 1977)',
			'09  - EXCEPTIONAL RES',
			'11  - LUXURY SUITE',
			'17  - DORMITORY',
			'22  - APARTMENT <4 STORY',
			'23  - APARTMENT >3 STORY',
			'24  - TOWNHOUSE',
			'25  - CONDOMINIUM',
			'27  - DUPLEX/TRIPLEX/QUADPLX/ETC',
			'29  - ROOMING HOUSE',
			'30  - LOUNGE',
			'31  - RETAIL SERVICES',
			'32  - STORE MALL ANCHOR',
			'33  - WAREHSE DISC STORE',
			'34  - DRUGSTORE',
			'35  - STORE RETAIL',
			'36  - STORE DISCOUNT',
			'37  - STORE DEPT',
			'38  - RETAIL STRIP CENTER',
			'39  - ANCHORED SHOP CTR',
			'40  - SH CTR REGIONAL',
			'42  - SUPERMARKET',
			'43  - CONVENIENCE STORE',
			'44  - HOTEL (LIMITED SERVICE)',
			'45  - HOTEL (FULL SERVICE)',
			'46  - MOTEL',
			'47  - COMM/CONDO 1',
			'48  - BROADCASTING FACILITY',
			'49  - OFFICE <3 STORY',
			'50  - OFFICE >2 STORY',
			'51  - COMM/CONDO 2',
			'52  - MEDICAL OFFICE',
			'53  - HOSPITAL',
			'54  - NURSING HOME',
			'55  - COMM/CONDO 3',
			'56  - RESTAURANT',
			'57  - REST FAST FOOD',
			'58  - BOWLING/SKATE',
			'59  - ARENA/STADIUM',
			'60  - AUDITORIUM',
			'61  - THEATER',
			'62  - COMM/CONDO 4',
			'63  - BRANCH BANK',
			'64  - MINI-LUBE GARAGE',
			'65  - AUTO SERVICE/REPAIR GARAGE',
			'66  - VEHICLE SALES',
			'67  - SERVICE/REPAIR SHOP',
			'68  - MORTUARY',
			'69  - CLUBHOUSE',
			'70  - COLD STRG/PCKG',
			'71  - TRANSPOR TERMNL',
			'72  - DAY CARE CENTER',
			'73  - FITNESS CENTER',
			'74  - CAR WASH FULL SERVICE',
			'75  - ASSISTED LIVING FACILITY',
			'76  - INDUSTRIAL CONDO 1',
			'77  - INDUSTRIAL CONDO 2',
			'78  - INDUSTRIAL CONDO 3',
			'79  - INDUSTRIAL CONDO 4',
			'80  - MFG LIGHT',
			'81  - WRHS MINI HR',
			'82  - WRHSE DISTRIB',
			'83  - WRHSE MINI',
			'84  - WRHSE - STORAGE',
			'85  - AIRCRAFT HANGAR',
			'86  - BARNS',
			'87  - PREFAB MTL BLD',
			'88  - FLEX WAREHOUSE',
			'89  - TRANSIT WAREHOUSE',
			'90  - SCHOOL',
			'91  - CHURCH',
			'92  - EDU/RELIG MISC',
			'93  - GOVMENTAL BLDG',
			'94  - PARKING GARAGE',
			'NC01  - NON CALC-SINGLE FAMILY',
			'NC02  - NON CALC-MANUFACTURED HOME (AYB > 1976)',
			'NC06  - NON CALC-RENTAL UNIT',
			'NC08  - NON CALC-MOBILE HOME (AYB < 1977)',
			'NC09  - NON CALC-EXCEPTIONAL RES',
			'NC10  - NON CALC-SPECIAL SFR',
			'NC27  - NON CALC-DUPLEX/TRIPLEX/QUADPLX/ETC',
		];
	}]
});