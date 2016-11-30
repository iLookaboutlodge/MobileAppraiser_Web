angular.module('app').config(['$stateProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;    
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    delete $httpProvider.defaults.headers.common['Origin'];

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    var login = {
        name: 'login',
        url: '/login',
        template: '<login></login>',
        data: {
            pageTitle: 'Login'
        }
    };

    var properties = {
        name: 'properties',
        url: '/properties',
        abstract: true,
        template: '<properties></properties>',
        data: {
            pageTitle: 'Properties'
        }
    };

    var propertiesUnscheduled = {
        name: 'properties.unscheduled',
        template: '<unscheduled properties="$ctrl.properties"></unscheduled>',
        url: '/unscheduled',
        title: 'Unscheduled Properties'
    };

    var propertiesScheduled = {
        name: 'properties.scheduled',
        template: '<scheduled properties="$ctrl.properties"></scheduled>',
        url: '/scheduled',
        title: 'Scheduled Properties'
    };

    var propertiesComplete = {
        name: 'properties.complete',
        template: '<complete properties="$ctrl.properties"></complete>',
        url: '/complete',
        title: 'Complete Properties'
    };

    var editProperty = {
        name: 'editproperty',
        url: '/property/{id}/edit',
        template: '<editproperty></editproperty>',
        params: {
            id: null
        }
    };

    var selectbuilding = {
        name: 'editproperty.selectbuilding',
        template: '<selectbuilding></selectbuilding>',
        url: '/buildings'
    };

    var buildingTab = {
        name: 'editproperty.buildingtab',
        template: '<buildingtab></buildingtab>',
        url: '/building/{buildingid}',
        params: {
            buildingid: null
        }
    };

    var buildingSketch = {
        name: 'editproperty.buildingtab.sketch',
        template: '<buildingsketch></buildingsketch>',
        url: '/sketch'
    };

    var buildingDetails = {
        name: 'editproperty.buildingtab.details',
        template: '<buildingdetails></buildingdetails>',
        url: '/details'
    };

    var buildingCharacteristics = {
        name: 'editproperty.buildingtab.characteristics',
        template: '<buildingcharacteristics></buildingcharacteristics>',
        url: '/characteristics'
    };

    var buildingInterior = {
        name: 'editproperty.buildingtab.interior',
        template: '<buildinginterior></buildinginterior>',
        url: '/interior'
    };

    var buildingDepreciation = {
        name: 'editproperty.buildingtab.depreciation',
        template: '<buildingdepreciation></buildingdepreciation>',
        url: '/depreciation'
    };

    var buildingAreas = {
        name: 'editproperty.buildingtab.areas',
        template: '<buildingareas></buildingareas>',
        url: '/areas'
    };

    var buildingExtraFeatures = {
        name: 'editproperty.buildingtab.extrafeatures',
        template: '<buildingextrafeatures></buildingextrafeatures>',
        url: '/extrafeatures'
    };

    var buildingNotes = {
        name: 'editproperty.buildingtab.notes',
        template: '<buildingnotes></buildingnotes>',
        url: '/notes'
    };

    var propertyTab = {
        name: 'editproperty.propertytab',
        template: '<propertyTab></propertyTab>',
        url: '/property'
    };

    var propertyDetails = {
        name: 'editproperty.propertytab.details',
        template: '<propertydetails></propertydetails>',
        url: '/details'
    };

    var propertyImages = {
        name: 'editproperty.propertytab.images',
        template: '<propertyimages></propertyimages>',
        url: '/images'
    };

    var propertyPermits = {
        name: 'editproperty.propertytab.permits',
        template: '<propertypermits></propertypermits>',
        url: '/permits'
    };

    var propertySales = {
        name: 'editproperty.propertytab.sales',
        template: '<propertysales></propertysales>',
        url: '/sales'
    };

    var propertyLand = {
        name: 'editproperty.propertytab.land',
        template: '<propertyland></propertyland>',
        url: '/land'
    };

    var propertyInspections = {
        name: 'editproperty.propertytab.inspections',
        template: '<propertyinspections></propertyinspections>',
        url: '/inspections'
    };

    var propertyNotes = {
        name: 'editproperty.propertytab.notes',
        template: '<propertynotes></propertynotes>',
        url: '/notes'
    };

    var property = {
        name: 'property',
        url: '/property/{id}',
        template: '<property></property>',
        params: {
            id: null
        }
    };

    var about = {
        name: 'about',
        url: '/about',
        template: '<about></about>'
    };

    var home = {
        name: 'default',
        url: '/',
        redirectTo: 'properties.scheduled'
    };

    var main = {
        name: 'options',
        url: '/options',
        template: '<main></main>'
    };

    var map = {
        name: 'map',
        url: '/map',
        template: '<map></map>'
    };

    var sketch = {
        name: 'sketch',
        url: '/sketch/{id}',
        template: '<sketch></sketch>',
        params: {
            id: null
        }
    };

    $stateProvider.state(home);
    $stateProvider.state(login);
    $stateProvider.state(editProperty);
    $stateProvider.state(property);
    $stateProvider.state(about);
    $stateProvider.state(main);
    $stateProvider.state(map);
    $stateProvider.state(sketch);

    $stateProvider.state(properties);
    $stateProvider.state(propertiesUnscheduled);
    $stateProvider.state(propertiesScheduled);
    $stateProvider.state(propertiesComplete);

    $stateProvider.state(buildingTab);
    $stateProvider.state(selectbuilding);
    $stateProvider.state(buildingDetails);
    $stateProvider.state(buildingSketch);
    $stateProvider.state(buildingCharacteristics);
    $stateProvider.state(buildingInterior);
    $stateProvider.state(buildingAreas);
    $stateProvider.state(buildingDepreciation);
    $stateProvider.state(buildingExtraFeatures);
    $stateProvider.state(buildingNotes);

    $stateProvider.state(propertyTab);
    $stateProvider.state(propertyDetails);
    $stateProvider.state(propertyImages);
    $stateProvider.state(propertyPermits);
    $stateProvider.state(propertySales);
    $stateProvider.state(propertyLand);
    $stateProvider.state(propertyInspections);
    $stateProvider.state(propertyNotes);
}]);
