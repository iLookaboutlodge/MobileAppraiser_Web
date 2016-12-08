angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('About/about.html',
    "<div class=\"ui-grid-solo\"><div id=\"MAAbout_Header\" class=\"ui-bar ui-bar-c\">GVP Mobile Appraiser</div><ul data-role=\"listview\" id=\"MAAbout_View\"><li><b>Product Name: </b>GVP Mobile Appraiser</li><li><b>Version: </b>Alpha 1.0.1.2</li><li><b>Release date: </b>Aug. 09, 2016</li><li><b>Description:</b><p><br>GVP Mobile Appraiser is part of the GeoViewport solution developed by iLOOKABOUT.</p></li><li><b>Mail:</b><p>iLOOKABOUT<br>c/o Administrative Assistant<br>383 Richmond St., Suite 408<br>London, ON N6A 3C4<br>Email:	info@ilookabout.com</p></li><li><a href=\"http://www.ilookabout.com\">iLOOKABOUT</a></li></ul></div>"
  );


  $templateCache.put('Draw/draw.html',
    "<i class=\"fa fa-pencil draw\" ng-click=\"$ctrl.selectDraw()\" ng-class=\"{selected: $ctrl.selected == 'draw'}\"></i> <i class=\"fa fa-window-minimize join\" ng-click=\"$ctrl.selectLine()\" ng-class=\"{selected: $ctrl.selected == 'line'}\"></i> <i class=\"fa fa-pencil-square-o join\" ng-click=\"$ctrl.selectSquare()\" ng-class=\"{selected: $ctrl.selected == 'square'}\"></i><canvas id=\"drawCanvas\" ng-touchstart=\"$ctrl.onTouchStart($event)\" ng-touchend=\"$ctrl.onTouchEnd($event)\" ng-touchmove=\"$ctrl.onTouchMove($event)\" ng-mousedown=\"$ctrl.onMouseDown($event)\" ng-mouseup=\"$ctrl.onMouseUp($event)\" ng-mousemove=\"$ctrl.onMouseMove($event)\"></canvas>"
  );


  $templateCache.put('Login/login.html',
    "<div id=\"login\"><img class=\"appTitleImage\" src=\"/images/MAppraisal_logo.png\"><div class=\"formWrapper\"><div class=\"row\"><label>USERNAME</label><input type=\"text\" data-clear-btn=\"false\" name=\"MALogin_Username\" value=\"\" autocomplete=\"off\"></div><div class=\"row\"><label>PASSWORD</label><input type=\"password\" data-clear-btn=\"true\" name=\"MALogin_Password\" value=\"\" autocomplete=\"off\"></div><div class=\"row\"><button type=\"submit\" ng-click=\"$ctrl.login()\">LOGIN</button></div></div></div>"
  );


  $templateCache.put('Map/map.html',
    "<div id=\"mapPage\"><div id=\"map\"><directions map=\"$ctrl.map\" waypoints=\"$ctrl.waypoints\" directionscallback=\"$ctrl.directionscallback(routes)\" origin=\"$ctrl.origin\" destination=\"$ctrl.destination\" waypointoptimized=\"true\" travelmode=\"DRIVING\"></directions><distances map=\"$ctrl.map\" origin=\"$ctrl.origin\" destinations=\"$ctrl.destinations\" distancescallback=\"$ctrl.distancescallback(distances)\" travelmode=\"DRIVING\"></distances></div><div><label>Start</label><input ng-model=\"$ctrl.startLoc\" type=\"text\" placeholder=\"Current Location\"></div><div><label>End</label><input ng-model=\"$ctrl.endLoc\" type=\"text\" placeholder=\"Current Location\"></div><button ng-click=\"$ctrl.getRoute()\">Get Route</button></div>"
  );


  $templateCache.put('Nav/navbar.html',
    "<div class=\"logoWrapper\"><img class=\"logo\" src=\"/images/iLOOKABOUT_logo.png\"></div><div class=\"iconWrapper\"><i ng-show=\"!$ctrl.online\" class=\"fa fa-wifi wifi\"></i> <i ng-show=\"!$ctrl.online\" class=\"fa fa-exclamation noInternet\"></i> <i ng-show=\"$ctrl.updating\" class=\"fa fa-refresh fa-spin dataUpdateIcon updating\"></i> <i ng-show=\"!$ctrl.updating\" class=\"fa fa-refresh dataUpdateIcon notUpdating\" ng-click=\"$ctrl.update()\"></i></div>"
  );


  $templateCache.put('Properties/complete.html',
    "<h1>Complete</h1><ul><li ng-repeat=\"property in $ctrl.filteredProperties\">{{property.Id}} {{property.WorkStatus}}</li></ul>"
  );


  $templateCache.put('Properties/properties.html',
    "<div id=\"properties\">{{title}}<div class=\"tabs\"><span ng-click=\"$ctrl.goToUnscheduled()\" ng-class=\"{selected: $ctrl.title == 'Unscheduled Properties'}\">Unscheduled </span><span ng-click=\"$ctrl.goToScheduled()\" ng-class=\"{selected: $ctrl.title == 'Scheduled Properties'}\">Scheduled </span><span ng-click=\"$ctrl.goToComplete()\" ng-class=\"{selected: $ctrl.title == 'Complete Properties'}\">Completed</span></div><div id=\"pageContent\"><ui-view></ui-view></div></div>"
  );


  $templateCache.put('Properties/scheduled/list.html',
    "<div><h2>Properties <span>{{$ctrl.properties.length}} / 21</span></h2><ul class=\"propertyList\"><li ng-repeat=\"property in $ctrl.properties | orderBy: 'order'\" ng-click=\"$ctrl.propertyClick(property)\"><article><header><div>{{property.markerLetter}}</div></header><span class=\"address\">{{property.Address.Address}}</span> <span>{{property.Buildings.length}} Buildings</span></article></li></ul></div>"
  );


  $templateCache.put('Properties/scheduled/location.html',
    "<div class=\"location\"><div class=\"row\"><i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i> <input ng-model=\"$ctrl.start\" type=\"text\" placeholder=\"Choose start location\"></div><div class=\"row\"><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> <input ng-model=\"$ctrl.end\" type=\"text\" placeholder=\"Choose end location\"></div><button ng-click=\"$ctrl.locationChanged()\" class=\"update\">Re-Calculate</button></div>"
  );


  $templateCache.put('Properties/scheduled/map.html',
    "<div class=\"mapContainer\"><directions ng-if=\"$ctrl.propertiesExist()\" waypoints=\"$ctrl.waypoints\" directionscallback=\"$ctrl.directionscallback(routes)\" origin=\"$ctrl.origin\" destination=\"$ctrl.destination\" waypointoptimized=\"true\" travelmode=\"DRIVING\"></directions></div>"
  );


  $templateCache.put('Properties/scheduled/property.html',
    "<div class=\"selectedPropertyWrapper\">\r" +
    "\n" +
    "    <a href=\"#\" ng-click=\"$ctrl.back()\" class=\"back\">\r" +
    "\n" +
    "        < back\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <span class=\"address\">{{$ctrl.property.Address.Address}}</span>\r" +
    "\n" +
    "    <img src=\"{{$ctrl.propertyImages[0]}}\">\r" +
    "\n" +
    "    <ul>\r" +
    "\n" +
    "        <li>\r" +
    "\n" +
    "            <label>Type</label>\r" +
    "\n" +
    "            <span>{{$ctrl.property.Type.Description}}</span>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li>\r" +
    "\n" +
    "            <label>Buildings</label>\r" +
    "\n" +
    "            <span>{{$ctrl.property.Buildings.length}}</span>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li>\r" +
    "\n" +
    "            <label>Owner</label>\r" +
    "\n" +
    "            <span>{{$ctrl.property.Owner.Name}}</span>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li>\r" +
    "\n" +
    "            <label>Owner Address</label>\r" +
    "\n" +
    "            <span>{{$ctrl.property.Owner.AddressLine1}}</span>\r" +
    "\n" +
    "            <span>{{$ctrl.property.Owner.City}}</span>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <a href=\"https://www.google.com/maps/dir/current+location/{{$ctrl.property.Address.Address}}\" class=\"left button\" target=\"_blank\">Directions</a>\r" +
    "\n" +
    "        <a href=\"#\" class=\"right button\" ng-click=\"$ctrl.goToProperty($ctrl.property.Id)\">View Property</a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <a href=\"#\" class=\"left button\" ng-click=\"$ctrl.onUnschedule()\">Unschedule</a>\r" +
    "\n" +
    "        <a href=\"#\" class=\"right button\" ng-click=\"$ctrl.onComplete()\">Complete</a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('Properties/scheduled/scheduled.html',
    "<div class=\"innerPropertiesPage\"><section ng-show=\"!$ctrl.scheduledProperties || $ctrl.scheduledProperties.length == 0\" class=\"noPropertiesMessage\"><h2>You currently have no scheduled properties to view.</h2><p>To schedule a property, click below and select the properties you want to view.</p><a href=\"#\" ng-click=\"$ctrl.goToUnscheduled()\">View Unscheduled properties</a></section><section ng-if=\"$ctrl.scheduledProperties && $ctrl.scheduledProperties.length > 0\"><div class=\"sideColumn\"><maporigindest ng-if=\"$ctrl.showList\" updatelocation=\"$ctrl.updatelocation(start, end)\"></maporigindest><scheduledpropertylist ng-if=\"$ctrl.showList\" properties=\"$ctrl.scheduledProperties\" onpropertyselected=\"$ctrl.propertyselected(property)\"></scheduledpropertylist><scheduledproperty ng-if=\"!$ctrl.showList\" property=\"$ctrl.selectedProperty\" update=\"$ctrl.updatepropertylist()\" back=\"$ctrl.tolist()\"></scheduledproperty></div><scheduledmap properties=\"$ctrl.scheduledProperties\" start=\"$ctrl.start\" end=\"$ctrl.end\" directionscallback=\"$ctrl.directionscallback(routes)\"></scheduledmap></section></div>"
  );


  $templateCache.put('Properties/unscheduled/list.html',
    "<h2>Properties <span>{{$ctrl.properties.length}} / 21</span></h2><ul class=\"propertyList\"><li ng-repeat=\"property in $ctrl.properties | orderBy: 'distance.duration.value' track by $index\" ng-click=\"$ctrl.propertyClick(property)\"><article><span class=\"address\">{{property.Address.Address}}</span> <span>{{property.Buildings.length}} Buildings</span><div class=\"distanceWrapper\"><span class=\"time\">{{property.distance.duration.text}}</span> <span class=\"distance\">{{property.distance.distance.text}}</span><div></div></div></article></li></ul>"
  );


  $templateCache.put('Properties/unscheduled/map.html',
    "<div class=\"mapContainer\"><div id=\"map\"></div><!--<markers\r" +
    "\n" +
    "        zoom=\"$ctrl.zoom\"\r" +
    "\n" +
    "        center=\"$ctrl.center\"\r" +
    "\n" +
    "        markers=\"$ctrl.markers\">    \r" +
    "\n" +
    "    </markers>--></div>"
  );


  $templateCache.put('Properties/unscheduled/property.html',
    "<div class=\"selectedPropertyWrapper\"><a href=\"#\" ng-click=\"$ctrl.back()\" class=\"back\"><span><i class=\"fa fa-arrow-left\"></i> back</span> </a><span class=\"address\">{{$ctrl.property.Address.Address}}</span> <img src=\"{{$ctrl.propertyImages[0]}}\"><ul><li><label>Type</label><span>{{$ctrl.property.Type.Description}}</span></li><li><label>Buildings</label><span>{{$ctrl.property.Buildings.length}}</span></li><li><label>Owner</label><span>{{$ctrl.property.Owner.Name}}</span></li><li><label>Owner Address</label><span>{{$ctrl.property.Owner.AddressLine1}}</span> <span>{{$ctrl.property.Owner.City}}</span></li></ul><div><a href=\"https://www.google.com/maps/dir/current+location/{{$ctrl.property.Address.Address}}\" class=\"left button\" target=\"_blank\">Directions</a> <a href=\"#\" class=\"left button\" ng-click=\"$ctrl.onSchedule()\">Schedule</a></div></div>"
  );


  $templateCache.put('Properties/unscheduled/unscheduled.html',
    "<div class=\"innerPropertiesPage\"><section ng-show=\"!$ctrl.unscheduledProperties || $ctrl.unscheduledProperties.length == 0\" class=\"noPropertiesMessage\"><h2>You currently have no unscheduled properties to view.</h2><p>Please ensure you have an internet connection to upload the latest list.</p><p>If no properties appear then please contact your manager</p></section><section ng-if=\"$ctrl.unscheduledProperties && $ctrl.unscheduledProperties.length > 0\"><div class=\"sideColumn\"><unscheduledpropertylist ng-if=\"$ctrl.unscheduledProperties && $ctrl.unscheduledProperties.length > 0 && $ctrl.showList\" properties=\"$ctrl.unscheduledProperties\" onpropertyselected=\"$ctrl.propertyselected(index)\"></unscheduledpropertylist><unscheduledproperty ng-if=\"!$ctrl.showList\" property=\"$ctrl.selectedProperty\" update=\"$ctrl.updatepropertylist()\" back=\"$ctrl.tolist()\"></unscheduledproperty></div><unscheduledmap ng-if=\"$ctrl.unscheduledProperties && $ctrl.unscheduledProperties.length > 0\" properties=\"$ctrl.unscheduledProperties\" selectedpropertyindex=\"$ctrl.selectedIndex\" propertyselected=\"$ctrl.propertyselected(index)\"></unscheduledmap></section></div>"
  );


  $templateCache.put('Property/Tabs/building/areas.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><div class=\"tableControl\"><i class=\"fa fa-plus addButton\" ng-click=\"$ctrl.addRow()\"></i> <span ng-show=\"$ctrl.selectedIndex != null && $ctrl.selectedIndex != 'undefined'\" class=\"rowControl\"><a href=\"#\" ng-click=\"$ctrl.editRow()\">Edit</a> <a href=\"#\" ng-click=\"$ctrl.removeRow()\">Remove</a></span></div><table class=\"defaultTable\"><tr class=\"header\"><th>Heated Area</th><th>PCT of Base</th><th>Sub-Area Mkt Value</th><th>Total Adj Area</th><th>Total Gross Area</th><th>Type</th></tr><tr class=\"content\" ng-repeat=\"area in $ctrl.building.BuildingAreas\" ng-click=\"$ctrl.selectRow($index)\" ng-class=\"{selected: $ctrl.selectedIndex == $index}\"><td>{{area.HeatedArea}}</td><td>{{area.PCTOfBase}}</td><td>{{area.SubareaMarketValue}}</td><td>{{area.TotalAdjustedArea}}</td><td>{{area.TotalGrossArea}}</td><td>{{area.Type}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/building/characteristics.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><div class=\"tableControl\"><i class=\"fa fa-plus addButton\" ng-click=\"$ctrl.addRow()\"></i> <span ng-show=\"$ctrl.selectedIndex != null && $ctrl.selectedIndex != 'undefined'\" class=\"rowControl\"><a href=\"#\" ng-click=\"$ctrl.editRow()\">Edit</a> <a href=\"#\" ng-click=\"$ctrl.removeRow()\">Remove</a></span></div><table class=\"defaultTable\"><tr class=\"header\"><th>Code</th><th>Description</th><th>Notes</th><th>Percentage</th></tr><tr class=\"content\" ng-repeat=\"characteristic in $ctrl.building.BuildingCharacteristics\" ng-click=\"$ctrl.selectRow($index)\" ng-class=\"{selected: $ctrl.selectedIndex == $index}\"><td>{{characteristic.Code}}</td><td>{{characteristic.Description}}</td><td>{{characteristic.Note}}</td><td>{{characteristic.Percentage}}</td></tr></table></div></div><div class=\"popUpWrapper\" ng-show=\"$ctrl.showPopup\"><div class=\"popup\"><a href=\"#\" class=\"fa fa-times-circle-o closeButton\" ng-click=\"$ctrl.showPopup = false\"></a><div class=\"contents\"><div class=\"elementWrapper\"><label>Description</label><select ng-model=\"$ctrl.newDescription\" ng-options=\"x for x in $ctrl.descriptions\" ng-change=\"$ctrl.updateNotes()\"></select></div><div class=\"elementWrapper\"><label>Note</label><select ng-model=\"$ctrl.newNote\" ng-options=\"x.note for x in $ctrl.notes track by x.note\"></select></div><div class=\"elementWrapper\"><label>Percentage</label><input ng-model=\"$ctrl.newPercentage\" type=\"number\" min=\"0\" max=\"100\"></div></div><div class=\"buttonWrapper\"><a href=\"#\" class=\"cancel\" ng-click=\"$ctrl.showPopup = false\">Cancel</a> <a href=\"#\" class=\"save\" ng-click=\"$ctrl.saveNewCharacteristic()\">Save</a></div></div></div>"
  );


  $templateCache.put('Property/Tabs/building/depreciation.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><div class=\"tableControl\"><i class=\"fa fa-plus addButton\" ng-click=\"$ctrl.addRow()\"></i> <span ng-show=\"$ctrl.selectedIndex != null && $ctrl.selectedIndex != 'undefined'\" class=\"rowControl\"><a href=\"#\" ng-click=\"$ctrl.editRow()\">Edit</a> <a href=\"#\" ng-click=\"$ctrl.removeRow()\">Remove</a></span></div><table class=\"defaultTable\"><tr class=\"header\"><th>Description</th><th>Adjustment</th></tr><tr class=\"content\" ng-repeat=\"characteristic in $ctrl.building.BuildingDepreciation\" ng-click=\"$ctrl.selectRow($index)\" ng-class=\"{selected: $ctrl.selectedIndex == $index}\"><td>{{characteristic.Description}}</td><td>{{characteristic.DepreciationAdj}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/building/details.html',
    "<table class=\"listTable\"><tr><td class=\"label\">Class</td><td class=\"value text-left\"><select ng-model=\"$ctrl.building.BuildingProperty.Class\" ng-options=\"x for x in $ctrl.classes\"></select></td></tr><tr><td class=\"label\">Style</td><td class=\"value text-left\"><select ng-model=\"$ctrl.building.BuildingProperty.Style\" ng-options=\"x for x in $ctrl.styles\"></select></td></tr><tr><td class=\"label\">Type</td><td class=\"value text-left\"><select ng-model=\"$ctrl.building.BuildingProperty.Type_\" ng-options=\"x for x in $ctrl.types\"></select></td></tr><tr><td class=\"label\">AYB</td><td class=\"value text-left\">{{$ctrl.building.BuildingProperty.AYB}}</td></tr><tr><td class=\"label\">EYB</td><td class=\"value text-left\">{{$ctrl.building.BuildingProperty.EYB}}</td></tr><tr><td class=\"label\">EFF Base Rate</td><td class=\"value text-left\">{{$ctrl.building.BuildingProperty.EffBaseRate}}</td></tr><tr><td class=\"label\">% Good</td><td class=\"value text-left\">{{$ctrl.building.BuildingProperty.PercentageGood}}</td></tr><tr><td class=\"label\">Quality</td><td class=\"value text-left\"><select ng-model=\"$ctrl.building.BuildingProperty.Quality\" ng-options=\"x for x in $ctrl.qualities\"></select></td></tr><tr><td class=\"label\">Quality Index</td><td class=\"value text-left\">{{$ctrl.building.BuildingProperty.QualityIndex}}</td></tr><tr><td class=\"label\">Replacement Cost New</td><td class=\"value text-left\">{{$ctrl.building.BuildingProperty.ReplacementCostNew}}</td></tr></table>"
  );


  $templateCache.put('Property/Tabs/building/extraFeatures.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><div class=\"tableControl\"><i class=\"fa fa-plus addButton\" ng-click=\"$ctrl.addRow()\"></i> <span ng-show=\"$ctrl.selectedIndex != null && $ctrl.selectedIndex != 'undefined'\" class=\"rowControl\"><a href=\"#\" ng-click=\"$ctrl.editRow()\">Edit</a> <a href=\"#\" ng-click=\"$ctrl.removeRow()\">Remove</a></span></div><table class=\"defaultTable\"><tr class=\"header\"><th>ACT Year</th><th>Adj unit Price</th><th>Condition</th><th>Description</th><th>EFF Year</th><th>Grade</th><th>HX%</th><th>Length</th><th>Note</th><th>OBX Mkt Value</th><th>Orig Condition</th><th>Unit Price</th><th>Units</th><th>Use Code</th><th>Width</th><th>Year Roll</th></tr><tr class=\"content\" ng-repeat=\"extraFeature in $ctrl.building.BuildingExtraFeatures\" ng-click=\"$ctrl.selectRow($index)\" ng-class=\"{selected: $ctrl.selectedIndex == $index}\"><td>{{extraFeature.ActYear}}</td><td>{{extraFeature.AdjUnitPrice}}</td><td>{{extraFeature.Condition}}</td><td>{{extraFeature.Description}}</td><td>{{extraFeature.EffYear}}</td><td>{{extraFeature.Grade}}</td><td>{{extraFeature.HX}}</td><td>{{extraFeature.Length}}</td><td>{{extraFeature.Note}}</td><td>{{extraFeature.OBXFMarketValue}}</td><td>{{extraFeature.OriginalCondition}}</td><td>{{extraFeature.UnitPrice}}</td><td>{{extraFeature.Units}}</td><td>{{extraFeature.UseCode}}</td><td>{{extraFeature.Width}}</td><td>{{extraFeature.YearRoll}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/building/interior.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><div class=\"tableControl\"><i class=\"fa fa-plus addButton\" ng-click=\"$ctrl.addRow()\"></i> <span ng-show=\"$ctrl.selectedIndex != null && $ctrl.selectedIndex != 'undefined'\" class=\"rowControl\"><a href=\"#\" ng-click=\"$ctrl.editRow()\">Edit</a> <a href=\"#\" ng-click=\"$ctrl.removeRow()\">Remove</a></span></div><table class=\"defaultTable\"><tr class=\"header\"><th>Description</th><th>Units</th></tr><tr class=\"content\" ng-repeat=\"characteristic in $ctrl.building.BuildingInternal\" ng-click=\"$ctrl.selectRow($index)\" ng-class=\"{selected: $ctrl.selectedIndex == $index}\"><td>{{characteristic.Description}}</td><td>{{characteristic.Units}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/building/notes.html',
    "<div id=\"notes\"><div class=\"notesWrapper\"><a href=\"#\" class=\"fa fa-plus addButton\" ng-click=\"$ctrl.showPopup = true\"></a><ul><li ng-repeat=\"note in $ctrl.building.Notes | orderBy:'-Date' track by $index\"><div class=\"nameWrapper\"><span class=\"user\">{{note.User}}</span> <span class=\"date\">{note.Date | dateString}}</span></div><p class=\"note\">{{note.Note}}</p><span class=\"remove\" ng-click=\"$ctrl.remove(note)\">Remove</span></li></ul><div></div><div class=\"popUpWrapper\" ng-show=\"$ctrl.showPopup\"><div class=\"popup\"><a href=\"#\" class=\"fa fa-times-circle-o closeButton\" ng-click=\"$ctrl.showPopup = false; $ctrl.newNote = ''\"></a><div class=\"contents\"><div class=\"elementWrapper\"><label>Note</label><textarea ng-model=\"$ctrl.newNote\" type=\"text\"></textarea></div></div><div class=\"buttonWrapper\"><a href=\"#\" class=\"cancel\" ng-click=\"$ctrl.showPopup = false; $ctrl.newNote = ''\">Cancel</a> <a href=\"#\" class=\"save\" ng-click=\"$ctrl.saveNote()\">Save</a></div></div></div></div></div>"
  );


  $templateCache.put('Property/Tabs/building/sketch.html',
    "<div id=\"sketchContainer\"><p class=\"traverse\">{{$ctrl.building.BuildingProperty.TraverseString}}</p><img data-ng-src=\"{{$ctrl.sketch.url}}\" style=\"max-height: {{$ctrl.imageHeight}}px\"><draw></draw></div>"
  );


  $templateCache.put('Property/Tabs/buildingTab.html',
    "<div><ul id=\"secondaryNavigation\" class=\"buildingNavigation\"><li ng-click=\"$ctrl.goToSketch()\" ng-class=\"{selected: $ctrl.selectedTab=='sketch'}\">Sketch</li><li ng-click=\"$ctrl.goToDetails()\" ng-class=\"{selected: $ctrl.selectedTab=='details'}\">Details</li><li ng-click=\"$ctrl.goToCharacteristics()\" ng-class=\"{selected: $ctrl.selectedTab=='characteristics'}\">Characteristics</li><li ng-click=\"$ctrl.goToInterior()\" ng-class=\"{selected: $ctrl.selectedTab=='interior'}\">Interior</li><li ng-click=\"$ctrl.goToDepreciation()\" ng-class=\"{selected: $ctrl.selectedTab=='depreciation'}\">Depreciation</li><li ng-click=\"$ctrl.goToAreas()\" ng-class=\"{selected: $ctrl.selectedTab=='areas'}\">Sub-Area</li><li ng-click=\"$ctrl.goToExtraFeatures()\" ng-class=\"{selected: $ctrl.selectedTab=='extraFeatures'}\">Ex-Features</li><li ng-click=\"$ctrl.goToNotes()\" ng-class=\"{selected: $ctrl.selectedTab=='notes'}\">Notes</li></ul><ui-view></ui-view></div>"
  );


  $templateCache.put('Property/Tabs/property/details.html',
    "<table class=\"listTable\"><tr><td class=\"label\">Address</td><td class=\"value text-left\">{{$ctrl.property.Address.Address}}</td></tr><tr><td class=\"label\">Area</td><td class=\"value text-left\">{{$ctrl.property.Details.Description}}</td></tr><tr><td class=\"label\">Owner</td><td class=\"value text-left\">{{$ctrl.property.Owner.Name}}, {{$ctrl.property.Owner.AddressLine1}}, {{$ctrl.property.Owner.AddressLine2}}, {{$ctrl.property.Owner.City}}, {{$ctrl.property.Owner.State}}, {{$ctrl.property.Owner.Zip}}</td></tr><tr><td class=\"label\">Type</td><td class=\"value text-left\">{{$ctrl.property.Type.Description}}</td></tr><tr><td class=\"label\">CR Flag</td><td class=\"value text-left\">{{$ctrl.property.Type.CR_Flag}}</td></tr><tr><td class=\"label\">DOR CD</td><td class=\"value text-left\">{{$ctrl.property.Type.Dor_CD}}</td></tr><tr><td class=\"label\">Building Adj</td><td class=\"value text-left\">{{$ctrl.property.Details.BuildingAdj}}</td></tr><tr><td class=\"label\">CD</td><td class=\"value text-left\">{{$ctrl.property.Details.CD}}</td></tr><tr><td class=\"label\">Legal</td><td class=\"value text-left legal\">{{$ctrl.property.Legal}}</td></tr></table>"
  );


  $templateCache.put('Property/Tabs/property/images.html',
    "<div id=\"propertyImages\" class=\"contentWrapper\"><div class=\"imageWrapper\"><span class=\"helper\"></span><div class=\"imageControls\"><i class=\"fa fa-arrow-left leftArrow\" ng-click=\"$ctrl.previousImage()\"></i> <span class=\"imageNumber\">{{$ctrl.currentImageIndex + 1}} / {{$ctrl.imageUrls.length}}</span> <i class=\"fa fa-arrow-right rightArrow\" ng-click=\"$ctrl.nextImage()\"></i></div><img data-ng-src=\"{{$ctrl.selectedImage}}\"></div></div>"
  );


  $templateCache.put('Property/Tabs/property/inspections.html',
    "<table class=\"listTable\"><tr><td class=\"label\">Site</td><td class=\"value text-center\">{{$ctrl.property.Inspections.SiteReviewBy}}</td><td class=\"value text-left\">{{$ctrl.property.Inspections.SiteReviewDate | dateString}}</td></tr><tr><td class=\"label\">Permit</td><td class=\"value text-center\">{{$ctrl.property.Inspections.PermitBy}}</td><td class=\"value text-left\">{{$ctrl.property.Inspections.PermitDate | dateString}}</td></tr><tr><td class=\"label\">Value</td><td class=\"value text-center\">{{$ctrl.property.Inspections.ValueBy}}</td><td class=\"value text-left\">{{$ctrl.property.Inspections.ValueDat | dateString}}</td></tr><tr><td class=\"label\">Sales</td><td class=\"value text-center\">{{$ctrl.property.Inspections.SalesBy}}</td><td class=\"value text-left\">{{$ctrl.property.Inspections.SalesDate | dateString}}</td></tr><tr><td class=\"label\">Aerial</td><td class=\"value text-center\">{{$ctrl.property.Inspections.AerialBy}}</td><td class=\"value text-left\">{{$ctrl.property.Inspections.AerialDate | dateString}}</td></tr><tr><td class=\"label\">EX Use</td><td class=\"value text-center\">{{$ctrl.property.Inspections.ExBy}}</td><td class=\"value text-left\">{{$ctrl.property.Inspections.ExDate | dateString}}</td></tr></table>"
  );


  $templateCache.put('Property/Tabs/property/land.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><div class=\"tableControl\"><i class=\"fa fa-plus addButton\" ng-click=\"$ctrl.addRow()\"></i> <span ng-show=\"$ctrl.selectedIndex != null && $ctrl.selectedIndex != 'undefined'\" class=\"rowControl\"><a href=\"#\" ng-click=\"$ctrl.editRow()\">Edit</a> <a href=\"#\" ng-click=\"$ctrl.removeRow()\">Remove</a></span></div><table class=\"defaultTable\"><tr class=\"header\"><th>Adj Unit Price</th><th>Depth</th><th>Description</th><th>Front</th><th>GRV Age</th><th>HX%</th><th>LT</th><th>Land Value</th><th>Note</th><th>Total Adj</th><th>Unit Price</th><th>Unit Type</th><th>Units</th><th>Use Code</th><th>Zone</th></tr><tr class=\"content\" ng-repeat=\"land in $ctrl.property.LandDescriptions\" ng-click=\"$ctrl.selectRow($index)\" ng-class=\"{selected: $ctrl.selectedIndex == $index}\"><td>{{land.AdjUnitPrice}}</td><td>{{land.Depth}}</td><td>{{land.Description}}</td><td>{{land.Front}}</td><td>{{land.GRVAge}}</td><td>{{land.HX}}</td><td>{{land.LT}}</td><td>{{land.LandValue}}</td><td>{{land.Note}}</td><td>{{land.TotalAdj}}</td><td>{{land.UnitPrice}}</td><td>{{land.UnitType}}</td><td>{{land.Units}}</td><td>{{land.UseCode}}</td><td>{{land.Zone}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/property/notes.html',
    "<div id=\"notes\"><div class=\"notesWrapper\"><a href=\"#\" class=\"fa fa-plus addButton\" ng-click=\"$ctrl.showPopup = true\"></a><ul><li ng-repeat=\"note in $ctrl.property.Notes | orderBy:'-Date' track by $index\"><div class=\"nameWrapper\"><span class=\"user\">{{note.User}}</span> <span class=\"date\">{{note.Date | dateString}}</span></div><p class=\"note\">{{note.Note}}</p><span class=\"remove\" ng-click=\"$ctrl.remove(note)\">Remove</span></li></ul><div></div><div class=\"popUpWrapper\" ng-show=\"$ctrl.showPopup\"><div class=\"popup\"><a href=\"#\" class=\"fa fa-times-circle-o closeButton\" ng-click=\"$ctrl.showPopup = false; $ctrl.newNote = ''\"></a><div class=\"contents\"><div class=\"elementWrapper\"><label>Note</label><textarea ng-model=\"$ctrl.newNote\" type=\"text\"></textarea></div></div><div class=\"buttonWrapper\"><a href=\"#\" class=\"cancel\" ng-click=\"$ctrl.showPopup = false; $ctrl.newNote = ''\">Cancel</a> <a href=\"#\" class=\"save\" ng-click=\"$ctrl.saveNote()\">Save</a></div></div></div></div></div>"
  );


  $templateCache.put('Property/Tabs/property/permits.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><table class=\"defaultTable\"><tr class=\"header\"><th>Status</th><th>Total</th><th>Year</th></tr><tr class=\"content\" ng-repeat=\"permit in $ctrl.property.Permits\"><td>{{permit.Status}}</td><td>{{permit.Total}}</td><td>{{permit.Year}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/property/sales.html',
    "<div class=\"editableTablePage\"><div class=\"tableWrapper\"><table class=\"defaultTable\"><tr class=\"header\"><th>Date</th><th>IN</th><th>OR Inst No.</th><th>QU</th><th>RE</th><th>Sale Price</th><th>VI</th></tr><tr class=\"content\" ng-repeat=\"sale in $ctrl.property.Sales\"><td>{{sale.Date | dateString}}</td><td>{{sale.IN}}</td><td>{{sale.ORInstNo}}</td><td>{{sale.QU}}</td><td>{{sale.RE}}</td><td>{{sale.SalePrice}}</td><td>{{sale.VI}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/Tabs/propertyTab.html',
    "<ul id=\"secondaryNavigation\" class=\"propertyTabNavigation\"><li ng-click=\"$ctrl.goToDetails()\" ng-class=\"{selected: $ctrl.selectedTab=='details'}\">Details</li><li ng-click=\"$ctrl.goToImages()\" ng-class=\"{selected: $ctrl.selectedTab=='images'}\">Images</li><li ng-click=\"$ctrl.goToPermits()\" ng-class=\"{selected: $ctrl.selectedTab=='permits'}\">Permits</li><li ng-click=\"$ctrl.goToSale()\" ng-class=\"{selected: $ctrl.selectedTab=='sales'}\">Sale</li><li ng-click=\"$ctrl.goToLand()\" ng-class=\"{selected: $ctrl.selectedTab=='land'}\">Land</li><li ng-click=\"$ctrl.goToInspection()\" ng-class=\"{selected: $ctrl.selectedTab=='inspection'}\">Inspection</li><li ng-click=\"$ctrl.goToNotes()\" ng-class=\"{selected: $ctrl.selectedTab=='notes'}\">Notes</li></ul><ui-view></ui-view>"
  );


  $templateCache.put('Property/Tabs/selectBuilding.html',
    "<div id=\"selectBuilding\" class=\"contentWrapper\"><ul ng-repeat=\"item in $ctrl.buildings\"><li ng-click=\"$ctrl.goToBuilding(item.buildingId)\"><span>Building {{item.buildingId}}</span> <img data-ng-src=\"{{item.url}}\"></li></ul></div>"
  );


  $templateCache.put('Property/editProperty.html',
    "<div id=\"editProperty\"><header class=\"propertyLocation\"><h1>{{$ctrl.property.Address.UnitNumber}} {{$ctrl.property.Address.FullStreet}}, <span>{{$ctrl.property.Address.City}} {{$ctrl.property.Address.Zip}}</span></h1><nav><ul><li><a href=\"#\" ng-click=\"$ctrl.showPopup = true\"><i class=\"fa fa-file-text note\"></i></a></li><li><a ngf-select=\"$ctrl.upload($file)\"><i class=\"fa fa-camera camera\"></i></a></li><li><a href=\"#\" ng-click=\"$ctrl.goToProperty()\"><i class=\"fa fa-home homeButton\"></i></a></li></ul></nav></header><div class=\"buildingTitle\" ng-show=\"$ctrl.buildingId != null && $ctrl.buildingId != 'undefined'\"><i class=\"fa fa-arrow-left leftArrow\" ng-show=\"$ctrl.property.Buildings.length > 1\" ng-click=\"$ctrl.goToPreviousBuilding()\"></i> <span>Building {{$ctrl.buildingId}}</span> <i class=\"fa fa-arrow-right rightArrow\" ng-show=\"$ctrl.property.Buildings.length > 1\" ng-click=\"$ctrl.goToNextBuilding()\"></i></div><ul id=\"primaryNavigation\"><li ng-click=\"$ctrl.goToBuildingTab()\" ng-class=\"{selected: $ctrl.selectedTab == 'building'}\">Buildings</li><li ng-click=\"$ctrl.goToPropertyTab()\" ng-class=\"{selected: $ctrl.selectedTab == 'property'}\">Property</li></ul><ui-view></ui-view><div class=\"popUpWrapper\" ng-show=\"$ctrl.showPopup\"><div class=\"popup\"><a href=\"#\" class=\"fa fa-times-circle-o closeButton\" ng-click=\"$ctrl.showPopup = false; $ctrl.newNote = ''\"></a><div class=\"contents\"><div class=\"elementWrapper\"><label>Note</label><textarea ng-model=\"$ctrl.newNote\" type=\"text\"></textarea></div></div><div class=\"buttonWrapper\"><a href=\"#\" class=\"cancel\" ng-click=\"$ctrl.showPopup = false; $ctrl.newNote = ''\">Cancel</a> <a href=\"#\" class=\"save\" ng-click=\"$ctrl.saveNote()\">Save</a></div></div></div></div>"
  );


  $templateCache.put('Property/property.html',
    "<div id=\"property\"><header><h1>{{$ctrl.newProperty.Address.UnitNumber}} {{$ctrl.newProperty.Address.FullStreet}}, <span>{{$ctrl.newProperty.Address.City}} {{$ctrl.newProperty.Address.Zip}}</span></h1><a href=\"#\" ng-click=\"$ctrl.goToProperties()\"><i class=\"fa fa-bars\"></i></a></header><section class=\"tabs\"><nav><ul><li class=\"imagesTabHeader left\" ng-click=\"$ctrl.selectedTab=1\" ng-class=\"{selected: $ctrl.selectedTab==1}\">Images</li><li class=\"sketchesTabHeader middle\" ng-click=\"$ctrl.selectedTab=2\" ng-class=\"{selected:$ctrl.selectedTab==2}\">Sketches</li><li class=\"notesTabHeader right\" ng-click=\"$ctrl.selectedTab=3\" ng-class=\"{selected:$ctrl.selectedTab==3}\">Notes</li></ul></nav><div class=\"tab\" ng-show=\"$ctrl.selectedTab == 1\"><div class=\"innerTab\"><div class=\"imageWrapper\"><span class=\"helper\"></span><div class=\"imageControls\" ng-show=\"$ctrl.imageUrls.length > 1\"><i class=\"fa fa-arrow-left leftArrow\" ng-click=\"$ctrl.previousImage()\"></i> <span class=\"imageNumber\">{{$ctrl.currentImageIndex + 1}} / {{$ctrl.imageUrls.length}}</span> <i class=\"fa fa-arrow-right rightArrow\" ng-click=\"$ctrl.nextImage()\"></i></div><img data-ng-src=\"{{$ctrl.selectedImage}}\" style=\"max-height:{{$ctrl.imageHeight}}px\"></div></div></div><div class=\"tab\" ng-show=\"$ctrl.selectedTab == 2\"><div class=\"innerTab\"><div class=\"imageWrapper\"><span class=\"helper\"></span><div class=\"imageControls\" ng-show=\"$ctrl.sketches.length > 1\"><i class=\"fa fa-arrow-left leftArrow\" ng-click=\"$ctrl.previousSketch()\"></i> <span class=\"imageNumber\">Building {{$ctrl.selectedSketch.buildingId}}</span> <i class=\"fa fa-arrow-right rightArrow\" ng-click=\"$ctrl.nextSketch()\"></i></div><img data-ng-src=\"{{$ctrl.selectedSketch.url}}\" style=\"max-height:{{$ctrl.imageHeight}}px\"></div></div></div><div class=\"tab\" ng-show=\"$ctrl.selectedTab == 3\"><div class=\"innerTab\"><ul class=\"notes\"><li class=\"note\" ng-repeat=\"note in $ctrl.newProperty.Notes | orderBy:'Date' \"><div class=\"nameWrapper\"><span class=\"user\">{{note.User}}</span> <span class=\"date\">{{note.Date | dateString}}</span></div><p class=\"noteText\">{{note.Note}}</p></li></ul></div></div></section><!--   <draw></draw> --><section class=\"basicInformation\"><div class=\"basicInfo\"><div class=\"left clear-left\"><label>Id:</label><span>{{$ctrl.newProperty.Id}}</span></div><div class=\"left clear-left\"><label>Type:</label><span>{{$ctrl.newProperty.Type.Description}}</span></div><div class=\"left clear-left\"><label>Buildings:</label><span>{{$ctrl.newProperty.Buildings.length}}</span></div><div class=\"left clear-left\"><label>Owner:</label><ul><li><span>{{$ctrl.newProperty.Owner.Name}}</span></li><li><span>{{$ctrl.newProperty.Owner.AddressLine1}}</span></li></ul></div></div><div class=\"buttons\"><a href=\"https://www.google.com/maps/dir/current+location/{{$ctrl.newProperty.Address.Address}}\" target=\"_blank\" class=\"directions\">Directions </a><a href=\"#\" class=\"viewPropertyCard\" ng-click=\"$ctrl.goToEditProperty()\">View Property Card </a><a href=\"#\" class=\"complete\" ng-click=\"$ctrl.setPropertyToComplete()\">Complete</a></div></section></div>"
  );


  $templateCache.put('Sketch/sketch.html',
    "<div id=\"sketch\"><img src=\"{{$ctrl.url}}\"></div>"
  );

}]);
