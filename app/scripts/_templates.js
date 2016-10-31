angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('About/about.html',
    "<div class=\"ui-grid-solo\"><div id=\"MAAbout_Header\" class=\"ui-bar ui-bar-c\">GVP Mobile Appraiser</div><ul data-role=\"listview\" id=\"MAAbout_View\"><li><b>Product Name: </b>GVP Mobile Appraiser</li><li><b>Version: </b>Alpha 1.0.1.2</li><li><b>Release date: </b>Aug. 09, 2016</li><li><b>Description:</b><p><br>GVP Mobile Appraiser is part of the GeoViewport solution developed by iLOOKABOUT.</p></li><li><b>Mail:</b><p>iLOOKABOUT<br>c/o Administrative Assistant<br>383 Richmond St., Suite 408<br>London, ON N6A 3C4<br>Email:	info@ilookabout.com</p></li><li><a href=\"http://www.ilookabout.com\">iLOOKABOUT</a></li></ul></div>"
  );


  $templateCache.put('Draw/draw.html',
    "<h2>canvas</h2><canvas id=\"drawCanvas\" style=\"width:100%;height:300px\" ng-touchstart=\"$ctrl.onTouchStart($event)\" ng-touchend=\"$ctrl.onTouchEnd($event)\" ng-touchmove=\"$ctrl.onTouchMove($event)\" ng-mousedown=\"$ctrl.onMouseDown($event)\" ng-mouseup=\"$ctrl.onMouseUp($event)\" ng-mousemove=\"$ctrl.onMouseMove($event)\"></canvas>"
  );


  $templateCache.put('Login/login.html',
    "<div id=\"login\"><img class=\"appTitleImage\" src=\"/images/MAppraisal_logo.png\"><div class=\"formWrapper\"><div class=\"row\"><label>USERNAME</label><input type=\"text\" data-clear-btn=\"false\" name=\"MALogin_Username\" value=\"\" autocomplete=\"off\"></div><div class=\"row\"><label>PASSWORD</label><input type=\"password\" data-clear-btn=\"true\" name=\"MALogin_Password\" value=\"\" autocomplete=\"off\"></div><div class=\"row\"><button type=\"submit\" ng-click=\"$ctrl.login()\">LOGIN</button></div></div></div>"
  );


  $templateCache.put('Map/map.html',
    "<div id=\"mapPage\"><section class=\"basicInformation\"><header><h2>Basic Property Information</h2><nav><ul><li><a href=\"#\" ng-click=\"$ctrl.previous()\"><img src=\"/images/icons-svg/arrow-l-white.svg\"></a></li><li><a href=\"#\" ng-click=\"$ctrl.next()\"><img src=\"/images/icons-svg/arrow-r-white.svg\"></a></li></ul></nav></header><div class=\"sectionContent\"><div class=\"basicInfo\"><div class=\"left clear-left\"><label>Pin:</label><span>{{$ctrl.property.Pin}}</span></div><div class=\"left clear-left\"><label>Address:</label><span>{{$ctrl.property.FullAddress}}</span></div></div><div class=\"basicDetails\"><div ng-repeat=\"detail in $ctrl.property.Data[1]\" class=\"detail\"><label>{{detail.Field.Label}}:</label><span ng-show=\"detail.Field.ReadOnly && detail.Field.Type=='2'\">{{detail.Data.Value}}</span> <span ng-show=\"detail.Field.ReadOnly && detail.Field.Type=='5'\">{{detail.Field.Values[detail.Data.Value].Value}}</span> <input type=\"text\" ng-show=\"!detail.Field.ReadOnly && detail.Field.Type=='2'\" ng-model=\"$ctrl.property.Data[1][$index].Data.Value\" value=\"{{detail.Data.Value}}\"><select ng-show=\"!detail.Field.ReadOnly && detail.Field.Type=='5'\" ng-model=\"$ctrl.newProperty.Data[1][$index].Data.Value\" ng-options=\"item.Id as item.Value for item in detail.Field.Values\"></select></div></div></div></section><div id=\"map\"></div></div>"
  );


  $templateCache.put('Nav/navbar.html',
    "<nav role=\"navigation\" id=\"navigation\"><header><ul ng-show=\"$ctrl.loggedIn()\" class=\"topRightNav\"><li><a href=\"#\" ng-click=\"$ctrl.goToProperty()\"><img src=\"/images/property_icon.png\"></a></li><li><a href=\"#\" ng-click=\"$ctrl.goToSketch()\"><img src=\"/images/sketch_icon.png\"></a></li><li><a class=\"propertyNavigation\" href=\"https://www.google.com/maps/dir/current+location/{{$ctrl.property.FullAddress}}\" target=\"_blank\"><img src=\"/images/icons-png/direction2.png\"></a></li><li><img src=\"/images/icons-svg/user-black.svg\"></li><li><a href=\"#\" class=\"hamburger\" ng-click=\"$ctrl.goToProperties()\"><img src=\"/images/hamburger_menu.png\"></a></li></ul><div class=\"logoWrapper\"><img class=\"logo\" src=\"/images/iLOOKABOUT_logo.png\"></div><div><h3 ng-show=\"$ctrl.updating\" class=\"blink\">Updating Data</h3><h3 ng-show=\"!$ctrl.online\" class=\"blink\">No Internet Connection<h3></h3></h3></div></header></nav>"
  );


  $templateCache.put('Properties/properties.html',
    "<div id=\"properties\"><div class=\"searchBar\"><div class=\"searchWrapper\"><input type=\"text\" ng-model=\"searchText\"> <span><img src=\"/images/icons-svg/search-black.svg\"></span></div></div><div class=\"tableWrapper\"><table id=\"MAList_Table\"><tr class=\"header\"><th>Property ID</th><th>Class</th><th>Neighbourhood</th><th>Street #</th><th>Prefix</th><th>Street Name</th><th>Type</th><th>Unit</th><th>City/Province</th><th>Status</th><th>Date</th><th>Completed</th></tr><tr ng-repeat=\"property in $ctrl.properties\" ng-class-odd=\"'odd'\" ng-click=\"$ctrl.goToProperty(property.Pin)\"><td>{{property.Pin}}</td><td>{{$ctrl.getPropertyDetail(\"DOR_Code\", property).Value}}</td><td>{{$ctrl.getPropertyDetail(\"Nhbd\", property)}}</td><td>{{property.StreetNumber}}</td><td>{{property.StreetPrefix}}</td><td>{{property.StreetName}}</td><td>{{property.StreetType}}</td><td>{{property.Unit}}</td><td>{{property.City}}, {{property.Province}}</td><td>{{$ctrl.getPropertyDetail(\"Status\", property).Value}}</td><td>{{property.DateReviewed}}</td><td>{{property.Completed}}</td></tr></table></div></div>"
  );


  $templateCache.put('Property/editProperty.html',
    "<div id=\"property\"><section class=\"basicInformation\"><header><h2>Basic Property Information</h2><nav><ul><li><button type=\"submit\" ng-click=\"$ctrl.showPopup = true\">Save</button></li></ul></nav></header><div class=\"sectionContent\"><div class=\"basicInfo\"><div class=\"left clear-left\"><label>Pin:</label><span>{{$ctrl.newProperty.Pin}}</span></div><div class=\"left clear-left\"><label>Address:</label><span>{{$ctrl.newProperty.FullAddress}}</span></div></div><div class=\"basicDetails\"><div ng-repeat=\"detail in $ctrl.newProperty.Data[1]\" class=\"detail\"><label>{{detail.Field.Label}}:</label><span ng-show=\"detail.Field.ReadOnly && detail.Field.Type=='2'\">{{detail.Data.Value}}</span> <span ng-show=\"detail.Field.ReadOnly && detail.Field.Type=='5'\">{{detail.Field.Values[detail.Data.Value].Value}}</span> <input type=\"text\" ng-show=\"!detail.Field.ReadOnly && detail.Field.Type=='2'\" ng-model=\"$ctrl.newProperty.Data[1][$index].Data.Value\" value=\"{{detail.Data.Value}}\"><select ng-show=\"!detail.Field.ReadOnly && detail.Field.Type=='5'\" ng-model=\"$ctrl.newProperty.Data[1][$index].Data.Value\" ng-options=\"item.Id as item.Value for item in detail.Field.Values\"></select></div></div></div></section><div class=\"permitsAndExtra left overflow-hidden\"><section class=\"permits left\"><header><h2>Permits</h2></header><div class=\"sectionContent\"><table><tr><td ng-repeat=\"item in $ctrl.getHeaders($ctrl.newProperty.Permits)\">{{item.Field.Label}}</td></tr><tr ng-repeat=\"permit in $ctrl.newProperty.Permits\"><td ng-repeat=\"permitPart in permit\">{{permitPart.Data.Value}}</td></tr></table></div></section><section class=\"extra left clear-left\"><header><h2>Extra</h2></header><div class=\"sectionContent\"><table><tr><td ng-repeat=\"item in $ctrl.getHeaders($ctrl.newProperty.Extra)\">{{item.Field.Label}}</td></tr><tr ng-repeat=\"extra in $ctrl.newProperty.Extra\"><td ng-repeat=\"extraPart in extra\">{{extraPart.Data.Value}}</td></tr></table></div></section></div><section class=\"imageSection\"><div class=\"imgWrapper\"><img src=\"/images/Properties/{{$ctrl.newProperty.Pin}}.jpg\"></div></section><section class=\"propertyDetailsSection left clear-left overflow-hidden\"><header><h2>Property Details</h2></header><div class=\"sectionContent\"><div class=\"detailWrapper\" ng-repeat=\"detail in $ctrl.newProperty.Data[2]\"><label>{{detail.Field.Label}}</label><div ng-show=\"detail.Field.ReadOnly\"><span ng-show=\"detail.Field.Type=='2'\">{{detail.Data.Value}}</span> <span ng-show=\"detail.Field.Type=='5'\">{{detail.Field.Values[detail.Data.Value].Value}}</span></div><div ng-hide=\"detail.Field.ReadOnly\"><input type=\"text\" ng-model=\"$ctrl.newProperty.Data[2][$index].Data.Value\" ng-show=\"detail.Field.Type=='2'\" value=\"{{detail.Data.Value}}\"><select ng-show=\"detail.Field.Type=='5'\" ng-model=\"$ctrl.newProperty.Data[2][$index].Data.Value\" ng-options=\"item.Id as item.Value for item in detail.Field.Values\"></select></div></div></div></section><div ng-show=\"$ctrl.showPopup\" class=\"confirmPopup\"><div class=\"popupBox\"><p>Are you sure you want to confirm these details?</p><p>You will be automatically taken to your next property.</p><div class=\"buttons\"><button type=\"submit\" ng-click=\"$ctrl.showPopup = false\">Cancel</button> <button type=\"submit\" ng-click=\"$ctrl.complete();$ctrl.showPopup = false\">Confirm</button></div></div></div></div>"
  );


  $templateCache.put('Property/property.html',
    "<div id=\"property\"><!-- <input type=\"file\" accept=\"image/*\" capture=\"camera\"> --><!--     <form ng-app=\"fileUpload\" ng-controller=\"MyCtrl\" name=\"form\">\r" +
    "\n" +
    "  Single Image with validations\r" +
    "\n" +
    "  <div class=\"button\" ngf-select ng-model=\"file\" name=\"file\" ngf-pattern=\"'image/*'\"\r" +
    "\n" +
    "    ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-min-height=\"100\" \r" +
    "\n" +
    "    ngf-resize=\"{width: 100, height: 100}\">Select</div>\r" +
    "\n" +
    "  <button type=\"submit\" ng-click=\"$ctrl.submit()\">submit</button>\r" +
    "\n" +
    "</form> --><div ngf-select=\"$ctrl.upload($file)\">Upload of file select</div><ul><li ng-repeat=\"item in $ctrl.imageUrls track by $index\"><img data-ng-src=\"{{item}}\" style=\"max-width: 300px\"></li></ul><div><h2>Sketch</h2><img src=\"{{$ctrl.newProperty.SketchUrl}}\"><draw></draw></div><section class=\"basicInformation\"><header><h2>Basic Property Information</h2><nav><ul><li><button type=\"submit\" ng-click=\"$ctrl.goToEditProperty()\">Edit</button></li><li><button type=\"submit\" ng-click=\"$ctrl.setPropertyToComplete()\">Complete</button></li></ul></nav></header><div class=\"sectionContent\"><div class=\"basicInfo\"><div class=\"left clear-left\"><label>Pin:</label><span>{{$ctrl.newProperty.Pin}}</span></div><div class=\"left clear-left\"><label>Address:</label><span>{{$ctrl.newProperty.FullAddress}}</span></div></div></div></section><section class=\"imageSection\"><div class=\"imgWrapper\"><img src=\"/images/Properties/{{$ctrl.newProperty.Pin}}.jpg\"></div></section><section class=\"sketchSection\"><div class=\"sketchWrapper\"><img src=\"{{$ctrl.newProperty.SketchUrl}}\"></div></section></div>"
  );


  $templateCache.put('Sketch/sketch.html',
    "<div id=\"sketch\"><img src=\"{{$ctrl.sketchUrl}}\"></div>"
  );

}]);
