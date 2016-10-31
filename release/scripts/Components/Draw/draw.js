var drawComponent = angular.module("drawModule", ["ngTouch"]);
aboutComponent.component("draw",
{
	templateUrl: 'Draw/draw.html',
	scope: {

	},
	controller: [function() {
		var vm = this;

		var element = document.getElementById('drawCanvas');
		var canvas = angular.element(element);
		var ctx = element.getContext('2d');
      
		var drawing = false;
		var mousePos = { x:0, y:0 };
		var lastPos = mousePos;

		vm.onMouseDown = function (e) {
	    	drawing = true;
			lastPos = getMousePos(element, e);
			mousePos = lastPos;
		};

		vm.onMouseUp = function (e) {
			drawing = false;
		};

		vm.onMouseMove = function (e) {
			mousePos = getMousePos(e);
		};

		// Get the position of the mouse relative to the canvas
		function getMousePos(mouseEvent) {
			var rect = element.getBoundingClientRect();

			var scaleX = canvas[0].width / rect.width;
			var scaleY = canvas[0].height / rect.height;

			  return {
			    x: (mouseEvent.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
			    y: (mouseEvent.clientY - rect.top) * scaleY     // been adjusted to be relative to element
			  }
		}

		window.requestAnimFrame = (function (callback) {
	        return window.requestAnimationFrame || 
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimaitonFrame ||
   				function (callback) {
					window.setTimeout(callback, 1000/60);
	           };
		})();

		function renderCanvas() {
			if (drawing) {
				ctx.moveTo(lastPos.x, lastPos.y);
				ctx.lineTo(mousePos.x, mousePos.y);
				ctx.stroke();
				lastPos = mousePos;
			}
		}

		// Set up touch events for mobile, etc
		vm.onTouchStart = function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}

	        mousePos = getTouchPos(canvas, e);
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousedown", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			canvas.dispatchEvent(mouseEvent);
		};

		vm.onTouchEnd = function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}

			var mouseEvent = new MouseEvent("mouseup", {});
			canvas.dispatchEvent(mouseEvent);
		};

		vm.onTouchMove = function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}

			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
	  		canvas.dispatchEvent(mouseEvent);
		};

		// Get the position of a touch relative to the canvas
		function getTouchPos(touchEvent) {
			var rect = element.getBoundingClientRect();

			var scaleX = canvas[0].width / rect.width;
			var scaleY = canvas[0].height / rect.height;

			return {
				x: (touchEvent.touches[0].clientX - rect.left) * scaleX,
				y: (touchEvent.touches[0].clientY - rect.top) * scaleY
			};
		}

		document.body.addEventListener("touchstart",
			function (e) {
				if (e.target == canvas) {
					e.preventDefault();
				}
			}, false);

		document.body.addEventListener("touchend", 
			function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);

		document.body.addEventListener("touchmove", 
			function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);

		var drawLoop = function () {
			  requestAnimFrame(drawLoop);
			  renderCanvas();
		};

		drawLoop();
	}]
});