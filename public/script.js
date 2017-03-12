(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(el, callback) {
	el.addEventListener('mouseup', function() {
		callback()
	})
	el.addEventListener('touchend', function() {
		callback()
	})
}

},{}],2:[function(require,module,exports){
var cow = require('../svg/cow')

exports.create = function() {
	return '<svg id="cow">'
		+ '<rect x="-2000" width="5000" y="-2000" height="5000" fill="#d7eef4"></rect>'
		+ '<rect x="-2000" width="5000" y="440" height="2800" fill="#87de87"></rect>'
		+ g('bg', cow.bg)
		+ '<g transform="translate(50,0)">'
			+ g('tail', cow.tail)
			+ g('body', cow.body)
			+ '<g transform="translate(-40,20)">'
				+ g('head', cow.head)
			+ '</g>'
			+ '<g transform="translate(-25,20)">'
				+ g('eyes-1', cow.eyes1)
				+ g('eyes-2', cow.eyes2)
				+ g('mouth', cow.mouth)
				+ g('nose', cow.nose)
			+ '</g>'
		+ '</g>'
		+ touch()
	+ '</svg>'

	function g(id, inner) {
		return '<g id="' + id + '">' + inner + '</g>'
	}
	function touch() {
		return '<rect id="touch" x="200" y="200" width="600" height="600" opacity="0"></rect>'
	}
}


exports.init = function(el, sound) {
	el.eyes2.setAttribute('opacity', 0)

	var running = false

	el.touch.onclick = function() { animate() }

	function animate() {
		var start
		function step(timestamp) {
				if (!start) start = timestamp
				var progress = timestamp - start
				if(progress < 1500) {
						pos(-100 + (progress/10))
				  window.requestAnimationFrame(step)
				} else if(progress > 1500 && progress < 3000) {
						pos(-100 + (2000- (progress-1000))/10)
					window.requestAnimationFrame(step)
				} else if(progress > 3000 && progress < 3500) {
					window.requestAnimationFrame(step)
				} else {
					running = false
				}

			if(progress > 300 && progress < 2700) {
				el.eyes1.setAttribute('opacity', 0)
				el.eyes2.setAttribute('opacity', 1)
			} else {
				el.eyes1.setAttribute('opacity', 1)
				el.eyes2.setAttribute('opacity', 0)
			}
		}
		if(!running) {
			running = true
			window.requestAnimationFrame(step)
			sound.play()
		}
	}

	function pos(y) {
		var n = (Math.round((-y + 50)/3*2))
		el.tail.setAttribute('transform', 'rotate(' + -(n-100) + ', 113, 500)')
		var c = Math.round(80-n*0.8)
		el.mouth.setAttribute('transform', 'translate(0, ' + c + ')')
	}
}

},{"../svg/cow":14}],3:[function(require,module,exports){
var elephant = require('../svg/elephant')
var click = require('./click')

exports.create = function() {
	return '<svg id="elephant">'
		+ '<rect x="-2000" width="5000" y="-2000" height="5000" fill="#d7eef4"></rect>'
		+ '<rect x="-2000" width="5000" y="700" height="2800" fill="#ffeeaa"></rect>'
		+ g('trees', elephant.trees)
		+ g('tail', elephant.tail)
		+ g('body', elephant.body)
		+ g('head', elephant.head)
		+ g('eyes-1', elephant.eyes1)
		+ g('eyes-2', elephant.eyes2)
		+ touch()
	+ '</svg>'

	function g(id, inner, cp) {
		return '<g id="' + id + '">' + inner + '</g>'
	}
	function touch() {
		return '<rect id="touch" x="200" y="200" width="600" height="600" opacity="0"></rect>'
	}
}


exports.init = function(el, sound) {

	el.eyes2.setAttribute('opacity', 0)
	el.tail.setAttribute('transform', 'rotate(-80, 840, 475)')
	var running = false

	el.touch.onclick = function() { animate() }

	function animate() {
		var start
		function step(timestamp) {
				if (!start) start = timestamp
				var progress = timestamp - start
				if(progress < 1000) {
						pos(-100 + (progress/10))
				  window.requestAnimationFrame(step)
				} else if(progress > 1000 && progress < 2000) {
						pos(-100 + (1000- (progress-1000))/10)
					window.requestAnimationFrame(step)
				} else {
					running = false
				}

			if(progress > 100 && progress < 1900) {
				el.eyes1.setAttribute('opacity', 0)
				el.eyes2.setAttribute('opacity', 1)
			} else {
				el.eyes1.setAttribute('opacity', 1)
				el.eyes2.setAttribute('opacity', 0)
			}
		}
		if(!running) {
			running = true
			window.requestAnimationFrame(step)
			sound.play()
		}
	}

	function pos(y) {
		var n = Math.round(y+100)
		el.head.setAttribute('transform', 'rotate(' + n + ', 280, 300)')
		el.eyes2.setAttribute('transform', 'rotate(' + n + ', 280, 300)')
		el.tail.setAttribute('transform', 'rotate(' + (n -80) + ', 840, 475)')
	}
}

},{"../svg/elephant":15,"./click":1}],4:[function(require,module,exports){
module.exports = function(el, callback) {

// SVGs
	var svgsArr = document.getElementsByTagName('svg')
	el.svgs = []
	for(i=0;i<svgsArr.length;i++) { el.svgs.push(svgsArr[i]) }


// LION
	var lion = document.getElementById('lion')
	el.lion = {
		svg: lion,
		tail: lion.getElementById('tail'),
		mouth: lion.getElementById('mouth'),
		eyes1: lion.getElementById('eyes-1'),
		eyes2: lion.getElementById('eyes-2'),
		touch: lion.getElementById('touch')
	}	

// ELEPHANT 
	var elephant = document.getElementById('elephant')
	el.elephant = {
		svg: elephant,
		tail: elephant.getElementById('tail'),
		head: elephant.getElementById('head'),
		eyes1: elephant.getElementById('eyes-1'),
		eyes2: elephant.getElementById('eyes-2'),
		touch: elephant.getElementById('touch')
	}

// WHALE
	var whale = document.getElementById('whale')
	el.whale = {
		svg: whale,
		head: whale.getElementById('head'),
		tail: whale.getElementById('tail'),
		touch: whale.getElementById('touch'),
		splash1: whale.getElementById('splash-1'),
		splash2: whale.getElementById('splash-2'),
		splash3: whale.getElementById('splash-3'),
		splash4: whale.getElementById('splash-4')
	}

// POLAR 
	var polar = document.getElementById('polar')
	el.polar = {
		svg: polar,
		head: polar.getElementById('head'),
		leg: polar.getElementById('leg'),
		all: polar.getElementById('all'),
		touch: polar.getElementById('touch')
	}

// COW
	var cow = document.getElementById('cow')
	el.cow = {
		svg: cow,
		touch: cow.getElementById('touch'),
		eyes1: cow.getElementById('eyes-1'),
		eyes2: cow.getElementById('eyes-2'),
		mouth: cow.getElementById('mouth'),
		tail: cow.getElementById('tail')
	}

// ROOSTER
	var rooster = document.getElementById('rooster')
	el.rooster = {
		svg: rooster,
		touch: rooster.getElementById('touch'),
		head: rooster.getElementById('head'),
		tail: rooster.getElementById('tail'),
		wing: rooster.getElementById('wing'),
		leg: rooster.getElementById('leg')
	}
	callback()
}



},{}],5:[function(require,module,exports){
module.exports = function(sounds, callback) {
	sounds.lion = new Audio('lion.mp3')
	sounds.elephant = new Audio('elephant.mp3')
	sounds.whale = new Audio('whale.mp3')
	sounds.polar = new Audio('polar.mp3')
	sounds.cow = new Audio('cow.mp3')
	sounds.rooster = new Audio('rooster.mp3')
	callback()
}

},{}],6:[function(require,module,exports){
var lion = require('../svg/lion')

exports.create = function() {
	return '<svg id="lion">'
		+ '<rect x="-2000" width="5000" y="-2000" height="5000" fill="#d7eef4"></rect>'
		+ '<rect x="-2000" width="5000" y="800" height="2800" fill="#ffeeaa"></rect>'
		+ g('grass-2', lion.grass2)
		+ g('tail', lion.tail)
		+ g('body', lion.body)
		+ g('eyes-1', lion.eyes1)
		+ g('eyes-2', lion.eyes2)
		+ g('mouth', lion.mouth, 'mouth-cp')
		+ g('face', lion.face)
		+ g('grass-1', lion.grass1)
		+ touch()
	+ '</svg>'

	function g(id, inner, cp) {
		return '<g id="' + id + '">' + inner + '</g>'
	}
	function touch() {
		return '<rect id="touch" x="200" y="200" width="600" height="600" opacity="0"></rect>'
	}
}


exports.init = function(el, sound) {
	el.eyes2.setAttribute('opacity', 0)
	pos(-100)

	var running = false

	el.touch.onclick = function() { animate() }

	function animate() {
		var start
		function step(timestamp) {
				if (!start) start = timestamp
				var progress = timestamp - start
				if(progress < 1000) {
						pos(-100 + (progress/10))
				  window.requestAnimationFrame(step)
				} else if(progress > 1000 && progress < 2000) {
						pos(-100 + (1000- (progress-1000))/10)
					window.requestAnimationFrame(step)
				} else {
					running = false
				}

			if(progress > 100 && progress < 1700) {
				el.eyes1.setAttribute('opacity', 0)
				el.eyes2.setAttribute('opacity', 1)
			} else {
				el.eyes1.setAttribute('opacity', 1)
				el.eyes2.setAttribute('opacity', 0)
			}
		}
		if(!running) {
			running = true
			window.requestAnimationFrame(step)
			sound.play()
		}
	}

	function pos(y) {
		el.mouth.setAttribute('transform', 'translate(0,' + y + ')')
		var r = -y/2
		el.tail.setAttribute('transform', 'rotate(-' + r + ', 500, 900)')
	}
}

},{"../svg/lion":16}],7:[function(require,module,exports){
var polar = require('../svg/polar')
var click = require('./click')

exports.create = function() {
	return '<svg id="polar">'
		+ '<rect x="-2000" width="5000" y="-2000" height="5000" fill="#d7eef4"></rect>'
		+ '<g id="all">'
			+ g('ice', polar.ice)
			+ g('leg', polar.leg)
			+ g('body', polar.body)
			+ g('head', polar.head)
		+ '</g>'
		+ '<rect x="-2000" width="5000" y="800" height="2800" fill="#2c89a0"></rect>'
		+ sea()
		+ touch()
	+ '</svg>'

	function g(id, inner, cp) {
		return '<g id="' + id + '">' + inner + '</g>'
	}
	function sea() {
		var str = '<g id="sea">'
		for(i=-100;i<100;i++) { 
			str = str + '<circle cx="' + (i*20) + '" cy="810" r="20" fill="#2c89a0"></circle>' 
		}
		str = str + '</g>'
		return str
	}
	function touch() {
		return '<rect id="touch" x="200" y="200" width="600" height="600" opacity="0"></rect>'
	}
}


exports.init = function(el, sound) {
	el.head.setAttribute('transform', 'rotate(-20, 375, 360)') // -20 - 30
	el.leg.setAttribute('transform', 'rotate(0, 815, 440)') // 0 - 30
	el.all.setAttribute('transform', 'rotate(0, 500, 600)') // 0 - -10

	var running = false

	el.touch.onclick = function() { animate() }

	function animate() {
		var start
		function step(timestamp) {
				if (!start) start = timestamp
				var progress = timestamp - start
				if(progress < 1000) {
						pos(-100 + (progress/10))
				  window.requestAnimationFrame(step)
				} else if(progress > 1000 && progress < 2000) {
						pos(-100 + (1000- (progress-1000))/10)
					window.requestAnimationFrame(step)
				} else {
					running = false
				}
		}
		if(!running) {
			running = true
			window.requestAnimationFrame(step)
			sound.play()
		}
	}

	function pos(y) {
		var n = Math.round(y+100)
		el.head.setAttribute('transform', 'rotate(' + (n/2 - 20) + ', 375, 360)') // -20 - 30
		el.leg.setAttribute('transform', 'rotate(-' + (n/3) + ', 815, 440)') // 0 - 30
		el.all.setAttribute('transform', 'rotate(-' + n/10 + ', 500, 600)') // 0 - -10
	}
}

},{"../svg/polar":17,"./click":1}],8:[function(require,module,exports){
module.exports = function(el) {
	var width = window.innerWidth
	var height = window.innerHeight
	var ratio = width/height
	if(ratio > 1) {
		var m = ((width-height)/2)/height*1000
		var vb = '-' + m + ' 0 ' + (1000+(m*2)) + ' 1000'

	} else {
		var m = ((height-width)/2)/width*1000
		var vb = '0 ' + ' -' + m + ' 1000 ' + (1000+(m*2))
	}
	el.svgs.forEach(function(svg) {
		svg.setAttribute('viewBox', vb)
	})
}

},{}],9:[function(require,module,exports){
var rooster = require('../svg/rooster')
var click = require('./click')

exports.create = function() {
	return '<svg id="rooster">'
		+ '<rect x="-2000" width="5000" y="-2000" height="5000" fill="#162d50"></rect>'
		+ sun()
		+ '<rect x="-2000" width="5000" y="800" height="2800" fill="#87de87"></rect>'
		+ g('body', rooster.body)
		+ g('tail', rooster.tail)
		+ g('head', rooster.head)
		+ g('leg', rooster.leg)
		+ g('wing', rooster.wing)
		+ touch()
	+ '</svg>'

	function g(id, inner, cp) {
		return '<g id="' + id + '">' + inner + '</g>'
	}
	function sun() {
		return '<circle cx="900" cy="800" r="200" fill="#214478"></circle>'
			+ '<circle cx="900" cy="800" r="100" fill="#eeffaa"></circle>'
	}
	function touch() {
		return '<rect id="touch" x="200" y="200" width="600" height="600" opacity="0"></rect>'
	}
}


exports.init = function(el, sound) {
	el.head.setAttribute('transform', 'rotate(20, 665, 460)') // 20 - -30

	var running = false

	el.touch.onclick = function() { animate() }

	function animate() {
		var start
		function step(timestamp) {
				if (!start) start = timestamp
				var progress = timestamp - start
				if(progress < 1000) {
						pos(-100 + (progress/10))
				  window.requestAnimationFrame(step)
				} else if(progress > 1000 && progress < 2000) {
						pos(-100 + (1000- (progress-1000))/10)
					window.requestAnimationFrame(step)
				} else if(progress > 2000 && progress < 2200) {
					window.requestAnimationFrame(step)
				} else {
					running = false
				}
		}
		if(!running) {
			running = true
			window.requestAnimationFrame(step)
			sound.play()
		}
	}

	function pos(y) {
		var n = Math.round(y+100)
		el.head.setAttribute('transform', 'rotate(' + (20 - n/2) + ', 665, 460)') // 20 - -30
		el.wing.setAttribute('transform', 'rotate(' + n/5 + ', 510, 492)') // 0 - 20
		el.tail.setAttribute('transform', 'rotate(-' + n/8 + ', 393, 452)') // 0 - -10
		el.leg.setAttribute('transform', 'rotate(-' + n/5 + ', 400, 540)') // 0 - -20
	}
}

},{"../svg/rooster":18,"./click":1}],10:[function(require,module,exports){
var Siema = require('siema')

module.exports = function(app) {
	app.siema = new Siema({
		selector: '#page',
		loop: true
	})
}

},{"siema":13}],11:[function(require,module,exports){
var whale = require('../svg/whale')
var click = require('./click')

exports.create = function() {
	return '<svg id="whale">'
		+ '<rect x="-2000" width="5000" y="-2000" height="5000" fill="#d7eef4"></rect>'
		+ g('body', whale.body)
		+ g('tail', whale.tail)
		+ g('head', whale.head)
		+ sea()
		+ '<rect x="-2000" width="5000" y="500" height="2800" fill="#2c89a0"></rect>'
		+ g('splash-1', whale.splash1)
		+ g('splash-2', whale.splash2)
		+ g('splash-3', whale.splash3)
		+ g('splash-4', whale.splash4)
		+ touch()
	+ '</svg>'

	function g(id, inner, cp) {
		return '<g id="' + id + '">' + inner + '</g>'
	}
	function sea() {
		var str = '<g id="sea">'
		for(i=-100;i<100;i++) { 
			str = str + '<circle cx="' + (i*20) + '" cy="510" r="20" fill="#2c89a0"></circle>' 
		}
		str = str + '</g>'
		return str
	}
	function touch() {
		return '<rect id="touch" x="200" y="200" width="600" height="600" opacity="0"></rect>'
	}
}


exports.init = function(el, sound) {
	el.tail.setAttribute('transform', 'rotate(-50, 670, 520)')
	el.splash1.setAttribute('opacity', 0)
	el.splash2.setAttribute('opacity', 0)
	el.splash3.setAttribute('opacity', 0)
	el.splash4.setAttribute('opacity', 0)

	var running = false

	el.touch.onclick = function() { animate() }

	function animate() {
		var start
		function step(timestamp) {
				if (!start) start = timestamp
				var progress = timestamp - start
				if(progress < 1000) {
						pos(-100 + (progress/10))
				  window.requestAnimationFrame(step)
				} else if(progress > 1000 && progress < 2000) {
						pos(-100 + (1000- (progress-1000))/10)
					window.requestAnimationFrame(step)
				} else if(progress > 2000 && progress < 2300) {
					el.splash1.setAttribute('opacity', 1)
					window.requestAnimationFrame(step)
				} else if(progress > 2300 && progress < 2600) {
					el.splash1.setAttribute('opacity', 0)
					el.splash2.setAttribute('opacity', 1)
					window.requestAnimationFrame(step)
				} else if(progress > 2600 && progress < 2900) {
					el.splash2.setAttribute('opacity', 0)
					el.splash3.setAttribute('opacity', 1)
					window.requestAnimationFrame(step)
				} else if(progress > 2900 && progress < 3100) {
					el.splash3.setAttribute('opacity', 0)
					el.splash4.setAttribute('opacity', 1)
					window.requestAnimationFrame(step)
				} else if(progress > 3100 && progress < 4000) {
					el.splash4.setAttribute('opacity', 0)
					window.requestAnimationFrame(step)
				} else {
					running = false
				}
		}
		if(!running) {
			running = true
			window.requestAnimationFrame(step)
			sound.play()
		}
	}

	function pos(y) {
		var n = Math.round(y+100)/2
		el.tail.setAttribute('transform', 'rotate(' + (y/2) + ', 670, 520)')
		el.head.setAttribute('transform', 'rotate(' + n*0.6 + ', 490, 510)')
	}

}

},{"../svg/whale":19,"./click":1}],12:[function(require,module,exports){
var lion = require('./lib/lion')
var elephant = require('./lib/elephant')
var whale = require('./lib/whale')
var polar = require('./lib/polar')
var cow = require('./lib/cow')
var rooster = require('./lib/rooster')

var resize = require('./lib/resize')
var getElements = require('./lib/get-elements')
var getSounds = require('./lib/get-sounds')
var slides = require('./lib/slides')

var app = {
	el: {
		page: document.getElementById('page')
	}, 
	sounds: {}
}

window.app = app

window.onload = function() {
	createSvgs(app.el, function() {
		getSounds(app.sounds, function() {
			getElements(app.el, function() {
				init(app)
				resize(app.el)
			})
		}) 
	})
}

window.onresize = function() { resize(app.el) }

function createSvgs(el, callback) {
	var html = ''
		+ rooster.create()
		+ cow.create()
		+ elephant.create()
		+ lion.create()
		+ whale.create()
		+ polar.create()
	el.page.innerHTML = html
	callback()
}

function init(app) {
	slides(app)
	lion.init(app.el.lion, app.sounds.lion)
	elephant.init(app.el.elephant, app.sounds.elephant)
	whale.init(app.el.whale, app.sounds.whale)
	polar.init(app.el.polar, app.sounds.polar)
	cow.init(app.el.cow, app.sounds.cow)
	rooster.init(app.el.rooster, app.sounds.rooster)
}





},{"./lib/cow":2,"./lib/elephant":3,"./lib/get-elements":4,"./lib/get-sounds":5,"./lib/lion":6,"./lib/polar":7,"./lib/resize":8,"./lib/rooster":9,"./lib/slides":10,"./lib/whale":11}],13:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Siema",[],t):"object"==typeof exports?exports.Siema=t():e.Siema=t()}(this,function(){return function(e){function t(r){if(i[r])return i[r].exports;var s=i[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),o=function(){function e(t){var i=this;r(this,e),this.config=this.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,this.selectorWidth=this.selector.getBoundingClientRect().width,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.startIndex,this.transformProperty=this.webkitOrNot(),this.init(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler"].forEach(function(e){i[e]=i[e].bind(i)}),window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={start:0,end:0},this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler,{passive:!0}),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler))}return n(e,[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,threshold:20,loop:!1},i=e;for(var r in i)t[r]=i[r];return t}},{key:"webkitOrNot",value:function(){var e=document.documentElement.style;return"string"==typeof e.transform?"transform":"WebkitTransform"}},{key:"init",value:function(){if(null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selector.style.overflow="hidden",this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=this.selectorWidth/this.perPage*this.innerElements.length+"px",this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.config.draggable&&(this.sliderFrame.style.cursor="-webkit-grab");for(var e=document.createDocumentFragment(),t=0;t<this.innerElements.length;t++){var i=document.createElement("div");i.style.cssFloat="left",i.style.float="left",i.style.width=100/this.innerElements.length+"%",i.appendChild(this.innerElements[t]),e.appendChild(i)}this.sliderFrame.appendChild(e),this.selector.appendChild(this.sliderFrame),this.slideToCurrent()}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===s(this.config.perPage)){this.perPage=1;for(var e in this.config.perPage)window.innerWidth>e&&(this.perPage=this.config.perPage[e])}}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;0===this.currentSlide&&this.config.loop?this.currentSlide=this.innerElements.length-this.perPage:this.currentSlide=Math.max(this.currentSlide-e,0),this.slideToCurrent()}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.currentSlide===this.innerElements.length-this.perPage&&this.config.loop?this.currentSlide=0:this.currentSlide=Math.min(this.currentSlide+e,this.innerElements.length-this.perPage),this.slideToCurrent()}},{key:"goTo",value:function(e){this.currentSlide=Math.min(Math.max(e,0),this.innerElements.length-1),this.slideToCurrent()}},{key:"slideToCurrent",value:function(){this.sliderFrame.style[this.transformProperty]="translate3d(-"+this.currentSlide*(this.selectorWidth/this.perPage)+"px, 0, 0)"}},{key:"updateAfterDrag",value:function(){var e=this.drag.end-this.drag.start,t=Math.abs(e),i=Math.ceil(t/(this.selectorWidth/this.perPage));e>0&&t>this.config.threshold?this.prev(i):e<0&&t>this.config.threshold&&this.next(i),this.slideToCurrent()}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.selectorWidth=this.selector.getBoundingClientRect().width,this.sliderFrame.style.width=this.selectorWidth/this.perPage*this.innerElements.length+"px",this.slideToCurrent()}},{key:"clearDrag",value:function(){this.drag={start:0,end:0}}},{key:"touchstartHandler",value:function(e){e.stopPropagation(),this.pointerDown=!0,this.drag.start=e.touches[0].pageX}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.drag.end&&this.updateAfterDrag(),this.clearDrag()}},{key:"touchmoveHandler",value:function(e){e.stopPropagation(),this.pointerDown&&(this.drag.end=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing,this.sliderFrame.style[this.transformProperty]="translate3d("+(this.currentSlide*(this.selectorWidth/this.perPage)+(this.drag.start-this.drag.end))*-1+"px, 0, 0)")}},{key:"mousedownHandler",value:function(e){e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.start=e.pageX}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.sliderFrame.style.cursor="-webkit-grab",this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.drag.end&&this.updateAfterDrag(),this.clearDrag()}},{key:"mousemoveHandler",value:function(e){e.preventDefault(),this.pointerDown&&(this.drag.end=e.pageX,this.sliderFrame.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing,this.sliderFrame.style[this.transformProperty]="translate3d("+(this.currentSlide*(this.selectorWidth/this.perPage)+(this.drag.start-this.drag.end))*-1+"px, 0, 0)")}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.sliderFrame.style.cursor="-webkit-grab",this.drag.end=e.pageX,this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.updateAfterDrag(),this.clearDrag())}},{key:"destroy",value:function(){window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler)}}]),e}();t.default=o,e.exports=t.default}])});
},{}],14:[function(require,module,exports){
exports.body = '<path d="M402.4 414.7c-98.6-11.8-273.3-63-305.5 89 0 5.7.5 11.3 1.4 17-13.6 108.2 17.8 216.6 28.3 325h38.5c-2.7-49-8.3-97.6 31.3-150 5 36.2 10.5 72.3 13.6 108.5h29.2c-2.2-44-6.8-87.7 29.2-135.3 44.5 13.5 94 20.6 144 20.6 50.5 0 100.3-7.2 145-21 15.3 26.4 25 69 15 157.2l28 2.4C608 780 616 732 622 683.7 645 710 661.7 753 648 855l34.8 2.3c19.3-105.5 43-211 38.7-316.5 4.2-12.2-29-75.3-75.4-136.6-46.2-61.3-145 22.3-243.6 10.5z" fill="#f2f2f2"/><path d="M604 390.5c-24.5-5.4-80.4 41.2-59.3 89.2 12.2 27.8-28 34-5 59.5 23 25.3 64.7-6 89.2 2.5s35.8 45.4 53.2 39.6c17.5-5.8 18.6-24.6 12.4-42-6.2-17.7-50.3-20.7-55.8-38.5-5.4-17.8 19-19.5 16.2-41-2.8-21.4-26.2-64-51-69.3zM178.6 721.2c9.6-32 91.7-95.2 99-128 7.3-32.6-11-47.2-27-50.7-16-3.6-28.7 14-32.6 24.5-4 10.4 14.8 16.7 5.3 25.4s-32-18.6-49-15c-17 3.8-39.4 17.5-39.5 35.2 0 17.6 37.7 19 39.4 36 1.7 16.6-20.8 26.3-28 38.4-7.2 12.2-19.8 22.7-15.8 33.3 4 10.7 20 13 29 12.3 9-.6 9.6 20.7 19.2-11.4zM253 393C181 392.6 115 416 96.3 504c0 2.7 0 5.5.4 8.2 16.4-1.2 31.4-3.6 42-5 41.7-5.7 43.6-68 67-57 23.4 10.7-16.7 52 0 66.8 16.7 15 44.3-12 67-7.4 22.5 4.6 32 44.3 62 34.7 29.8-9.7 73-73.3 49.5-106.6-23.6-33.3-110 42.5-126.4 12.3-15-27.6 23-29.6 44-54.2-16.4-2-33-3-49-3zM463 496.2c-16.3 0-37.8 8-45.5 17.8-10.7 13.4-2.8 29 0 40.3 2.8 11.3 22 12.7 14 26.3-8 13.5-50.4-14.5-64.8 0-14.5 14.4 13.4 44 0 57.8-13.5 13.8-42-10-58 1.7-9.8 7.6-18 21.4-21 35 39 10 81 15 123.4 15 38.6 0 76.7-4.2 112.4-12.2 6.5-9.2 10.7-18.6 11.5-27 2.3-25.2-12.5-36-28-44-15.7-7.8-39.4 21.3-52.7 3.6-13.3-17.8 25.6-56.3 28-75.4 2.5-19 9.8-25.5-3.5-35-3.7-2.7-9.3-4-15.7-3.8zm253.2 97.4c-4.2 0-8.4.3-13 1-18.4 2.6-49.4 14.6-47.3 33.3 2 18.6 48.2 4 50.7 21 2.4 16.8-36 16-36.8 29.7-.8 13.7 22.4 11 24.4 24.5 2 13.7-24.5 28.7-22.8 42 1.7 13.6-1.3 21 22.8 24.6 1 .2 2.3.3 3.5.3 10.7-58.6 20-117.4 22.3-176.2l-4-.2zm-119.5 53.8c-10.4 8.4-28 19-43.3 21-.7.8-1.2 1.5-1.8 2 1.6-.3 3.2-.8 4.7-1.3 3.2 5.7 6.2 12 8.8 19.3 6.5-1.5 12.7-3 15.6 0 6.3 6.3 7.4 12 0 19.8-2 2.2-5.5 2.6-9.7 2.3 2.3 12.3 3.8 26.8 4.2 44 4.5-1.2 8.3-3 10.4-5.3 7.4-8-4.3-13.3-1.2-18.5 3-5.3 10-9 16-7.5 6 1.7-1.2 18.8 11.2 16 .6 0 1-.2 1.6-.4 2.7-18.2 5.3-36.3 7.6-54.4l1 1.3c0-.7 0-1.5-.3-2-14-12.5-18.7-21.7-24.8-36z" fill="#999"/><path d="M129 841c6.2-5.2 27.2-7 35.8-1.3 8.7 5.8 9 18.8 9.3 24.8.4 6 .2 7-2.4 9.3-2.5 2.2-7 3.4-10.5 1.2-3.5-2-.5-14.4-5.5-13.6-5 .8 2.6 12.4-1.2 15.5-3.8 3-8 1.5-13.6-2-5.7-3.5-13.8-15.3-15-21.7-1-6.4-3-7.2 3.2-12.4zM211.4 796.8c4.6-4 20-5.4 26.5-1 6.3 4.6 6.5 14.7 6.7 19.4.3 4.7 0 5.6-1.8 7.3-2 1.7-5.2 2.6-8 1-2.5-1.7-.3-11.3-4-10.7-3.7.6 2 9.7-1 12-2.7 2.5-5.8 1.4-10-1.4-4-2.7-10-12-11-17-.8-5-2.3-5.6 2.4-9.6zM650.5 843c5.6-5 24.5-7 32.3-1 7.8 5.7 8 18.7 8.4 24.7.2 6 0 7-2.2 9.3-2.3 2.2-6.3 3.3-9.5 1.2-3.3-2-.6-14.4-5-13.6-4.5.7 2.3 12.4-1.2 15.5-3.4 3-7 1.7-12.2-1.8-5-3.5-12.3-15.3-13.3-21.7-1-6.4-3-7.3 2.8-12.4zM574.2 815.7c4.6-4 20-5.4 26.5-1 6.4 4.6 6.6 14.7 6.8 19.4.3 4.8 0 5.7-1.8 7.4-2 1.7-5 2.6-7.8 1-2.7-1.7-.5-11.3-4.2-10.7-3.7.6 2 9.7-1 12-2.7 2.5-5.8 1.4-10-1.4-4-2.7-10-12-11-17-.8-5-2.3-5.6 2.4-9.6z" fill="#de8787"/><path d="M269.5 612.3c-90 52.7-126 118-110.3 207-4.5-84.2 42.5-145.8 110.3-207zM268.3 670l-10.5-5c-34 37-16 74-23 111 8-36 3-73.3 33.5-106zM621.5 683.6c-3.6 41.6-11 81.6-17.4 122 3.7-44.5 11-88.8 6-133.7zM692 809.3l28.6-264c5.3 107.7-15.3 181-28.5 264z" opacity=".1" fill="#1a1a1a"/>'

exports.head = '<path d="M746.7 223.6c-41.2 0-80.4 18.4-107.8 50.5-51.8-44.4-164 25.8-21 32-10.4 21.2-19.8 69 4 94 78 81.4 22.7 125.7 124.7 125 102-.7 74.6-80.8 126.7-124.3 28.6-23.8 12.8-71.8 3.2-92.3 142-6.3 31.3-76-20.6-32.5-27.4-33.3-67.3-52.4-109.3-52.4z" opacity="1" fill="#f2f2f2" fill-opacity="1"/><path d="M747.2 223a144.6 150.7 0 0 0-93.2 36.7c18.7 4.2 37.5 7.6 39 20 3.2 26.3-53 30.6-44.6 49.5 8.3 18.8 38 8.7 57 0 19-8.8 30-41 44.6-52 14.5-11 30.8-2.8 37.2-17.4 3.7-8.7 7.3-19 3.4-29.6-6.5-2.2-13-3.8-20-5a144.6 150.7 0 0 0-4.5-.8l-6-.7a144.6 150.7 0 0 0-11.6-.6h-1.2zM890 361.5c-22.5 1.8-43 6.5-55.8 10-34.7 9-24.8 21-42 34.6-17.4 13.7-69 24-62 47 6.8 23.3 46 12.4 67 5 20.6-7.3 26.7-55.4 47-44.6 4.5 2.5 7.2 6.7 8.5 12 5.3-9.2 12-17.7 21-25.2 12-10 16-24.2 16.2-38.8zM675.5 468c-2.7 0-5.7 0-9 .5 6.8 17.8 10 31.5 19 41a144.6 150.7 0 0 0 62 15h1.5a144.6 150.7 0 0 0 7.2-.3l3.3-.2a144.6 150.7 0 0 0 12-1.6c.8 0 1.5-.2 2.2-.4a144.6 150.7 0 0 0 7.2-1.7c20-5.5 32-16 40.7-29-16 5.4-36.4-2-52-1-19 1.2-35.6 6.5-52 2.4-16.3-4-18.8-24.5-42-24.7z" opacity="1" fill="#999" fill-opacity="1"/><path d="M830.2 261c-27 3.6-38.6-4.5-35-24.4 40 3.6 62.3-37.5 89.3-66.6-1.5 35-11 67.7-54.3 91zM661.7 261c27 3.5 38.5-4.7 35-24.5-40 3.6-62.3-37.5-89.3-66.6 1.5 35 11 67.6 54.3 91z" fill="#f9f9f9" fill-rule="evenodd"/><path d="M607.4 169.7c.5 12 2 23.4 5.3 34.4a41.4 38.4 0 0 0 18.6-6c-8-9.5-15.7-19.4-24-28.3zm277.2.2c-8.2 8.6-16 18.4-23.7 27.8a41.4 38.4 0 0 0 18.5 5.8c3-10.8 4.5-22.2 5-33.7z" fill="#4d4d4d" fill-rule="evenodd"/>'

exports.nose = '<path d="M694 471.5c1 2.2.7 4.4 4 6.5 25.6 8.2 53.3 12.5 89.6 1 2.8-1.3 5.7-2.5 6.2-7.8l.3-10.8-100.6-.3z" fill="#fff" fill-rule="evenodd"/><path d="M681.6 372.7C575 524.7 915 497 803.4 373.7z" fill="#de8787" fill-rule="evenodd"/><path d="M691 377.3a73.5 49.3 0 0 0-21.5 34.8 73.5 49.3 0 0 0 73.6 49.4 73.5 49.3 0 0 0 73.6-49.3 73.5 49.3 0 0 0-21.6-34.7H691z" opacity=".8" fill="#c83737" fill-opacity="1"/><path d="M669.2 376.3c19.2-23.5 45.6-11 72.7-11 23.4.2 49.3-10.7 74.4 11-20.5 22.2-34.6 54.3-38.6 81.5-23.3 11-46.7 11.2-70 .2-5.4-24.6-13.7-57.2-38.6-81.7z" fill="#de8787" fill-rule="evenodd"/>'

exports.mouth = '<g transform="matrix(1.22682 0 0 1.22682 1810.572 -703.506)"><rect ry="0" y="887.4" x="-917.4" height="73.3" width="90.7" opacity="1" fill="#f4d7d7" fill-opacity="1"/><path d="M-883.5 968.2c-1.7-9.8-39-28-32-41 6.7-13.3 29 2.5 43.8 2.4 15 0 37-14.6 44-2.5 6.7 12.2-22.4 31.3-24.7 41.2-2.3 10-29.4 9.7-31 0z" fill="#c83737" fill-rule="evenodd"/><path d="M-906.5 921.6c-3.8 0-7 1.5-9 5.2-1.7 3.4-.4 7.2 2.3 11 26.7 8.8 54.7 9 84 1 2.6-4.4 3.6-8.5 1.7-12-6.8-12-29 2.4-44 2.5-10.6 0-25-8-35-7.7z" fill="#782121" fill-rule="evenodd"/><path d="M-913.7 954l-.7-9.2c.6-1.5 1.4-3 4.3-2.5 27.4 11.3 52.4 8 76.6.3 3-.5 5.4 0 6.2 3v11.3l-41.8 14.6z" fill="#fff" fill-rule="evenodd"/><path d="M-909.4 952.4c-16-7.5-16.6 11.7 0 20.7 16.7 9 62.3 6.2 78.3.6 16-5.7 15-29.3-1-21.2-16.2 8-61.3 7.4-77.4 0z" fill="#de8787" fill-rule="evenodd"/></g>'

exports.eyes1 = '<path d="M724.8 318.8a22.8 21 0 0 1-22.8 21 22.8 21 0 0 1-22.8-21 22.8 21 0 0 1 22.8-21 22.8 21 0 0 1 22.8 21zM806.3 319.7a22.8 21 0 0 1-22.8 21 22.8 21 0 0 1-22.8-21 22.8 21 0 0 1 22.8-21 22.8 21 0 0 1 22.8 21z" opacity="1" fill="#fff"/><path d="M711.6 327.6a10 9.6 0 0 1-10 9.7 10 9.6 0 0 1-10-9.7 10 9.6 0 0 1 10-9.6 10 9.6 0 0 1 10 9.6zM793.6 328.5a10 9.6 0 0 1-10 9.6 10 9.6 0 0 1-10.2-9.5 10 9.6 0 0 1 10-9.7 10 9.6 0 0 1 10.2 9.7z" opacity="1" fill="#1a1a1a"/>'

exports.eyes2 = '<path d="M685.4 306.6c6.2 7.2 10.7 15 28.8 19-17.5.7-22.2 10.8-31.6 17.6 15.5-7 29-15.4 48-19.2-15-1.6-30-8.5-45.2-17.4zm125.7 0c-15 9-30 15.8-45.2 17.4 19.2 3.8 32.6 12.3 48 19.2-9.3-6.8-14-17-31.6-17.7 18-4 22.7-11.7 29-19z" fill="#502d16" fill-rule="evenodd"/>'

exports.tail = '<path d="M112 485.5c10.8 1.7 10.8 11.5 3.2 27-40 62.8-27.6 147.7-45.8 211 11-50-21.3-244.6 42.7-238z" fill="#f2f2f2"/><path d="M75.2 684.4c-9 1.5-16.5 7.8-10.5 56.5 4.6-18.8 28.7-34.8 10.5-56.6z" fill="#4d4d4d"/>'

exports.bg = '<path d="M-38.6 450.2c144.2 48 293 76.5 467.2-6.4 125.5 49.5 269.3 92.5 790.7 1 165.2 33 325 75.2 556.4-3.2 0 0-45.8-216.2-128.6-334.5-82.7-118.2-196.5-128-294-4.2-97.8 123.8.2 257.2-140 276.2-140.5 19-198-121.2-306-263.3-107.8-142-258.8-147.5-360 0C446 263.2 518 326.3 427 327.2c-90.5 1-21.3-79-100-164-78.4-85-198.4-121.7-280 0-81.3 121.7-85.6 287-85.6 287z" fill="#87de87"/><path d="M721.6 4.4C658.8 5 597 40.4 547.2 113c-20 29-33 54.7-42 77.3 20-12.6 42-28 56.3-23.3 24.7 8.3-8 34.3 14.2 41 22.2 6.7 44-41 74.3-34.5 30.4 6.5 12.3 68.4 45.7 69 33.5.7 18.8-60.8 48.6-64.7 29.8-4 36.6 46 63 41 26.2-5 2.3-52 28.4-56 26.2-4.3 37.6 45.4 57.2 43 19.5-2.4-5.7-21.7 17-26 22-4 29.3 60.3 77.8 47-25-35.5-51-74.6-80.6-113.8C852.4 41 786.5 4 721.6 4.4zm779.2 7c-49.5 0-100.6 28.7-148 88.7-26.3 33.5-38.4 67.6-44.8 100 9.5-8.6 20-14.7 33.5-13.6 40 3.3 34.6 79 74.2 75.5 39.7-3.5 13-73.7 45.8-80 32.7-6 40.7 41 68.5 41 27.8.2 35-40.3 63-36.6 28 3.8 15.6 59.3 48.5 58.3 32-1 15.5-63 45.8-70.7-12.2-25-25.6-49-40-69.6-42.8-61-93.8-93-146.5-93zm-1326.6 71c-45.3.4-90 23-127 78-10.7 16-20 32.8-28.3 49.8 21.7-9.5 42-17 54-10.8 30 15-15 47.8 8.5 54 23.4 6 29-42 54.2-41 25.3.7 24.6 45.3 48.6 43 24-2 4.4-45 31.4-47.4 27-2.4 34.7 61 60 54 25.4-7-27-39.7 0-52 24-10.6 63.4 38.8 94.3 43.8-4-27.3-12-60-42.8-93.3-43-46.4-98.3-78.5-153-78z" opacity="1" fill="#f9f9f9"/><path d="M53 269c-59-25.8 55.2-136 91.3-119.8 36 16-32.6 145.5-91.4 119.8z" opacity=".2" fill="#fff"/><path d="M-1368.6 450c144.2 47.7 293 76.4 467.2-6.6C-776 493-632 536-110.7 444.4c165.2 33 324 74.3 555.4-4-7 4.2 6-74.2-28.3-112.7-51-57.7-70-153.8-99.3-221-59.5-136.6-196.5-128-294-4.3-97.8 123.8.2 257.3-140 276.3-140.5 19-198-121.3-306-263.3-107.8-142-258.8-147.5-360 0C-884 263-812 326-903 327c-90.5.8-21.3-79.3-100-164-78.4-85-198.4-121.8-280 0-81.3 121.6-85.6 287-85.6 287z" fill="#87de87"/><path d="M-608.4 4c-62.8.5-124.7 36-174.4 108.7-20 29-33 54.6-42 77.2 20-12.6 42-28 56.3-23.4 24.7 8.3-8 34.3 14.2 41 22.2 6.8 44-41 74.3-34.5 30.4 6.7 12.3 68.5 45.7 69.2 33.5.6 18.8-61 48.6-64.8 29.8-4 36.6 46 63 41 26.2-5 2.3-52 28.4-56 26.2-4.3 37.6 45.5 57.2 43 19.5-2.3-5.7-21.6 17-25.8 22-4 29.3 60.2 77.8 47-25-35.7-51-74.7-80.6-114-54.8-72-120.7-109-185.6-108.5zM187 1C137.5 1 70.2 39.7 23 99.6c-26.5 33.4-38.6 67.6-45 100C-12.5 191-2 185 11.5 186c40 3.3 34.6 79 74.2 75.6 39.7-3.5 13-73.6 45.8-80 32.7-6 40.7 41 68.5 41 27.8.3 35-40.3 63-36.5 28 3.8 15.6 59.4 48.5 58.3 32-1 5-51 35.3-58.6-12.2-25-11-65-25.6-85.7C278.5 39 239.7.8 187 1zm-1342.8 81c-45.3.4-90 23-127 78.2-10.7 16-20 32.7-28.3 49.7 21.7-9.7 42-17 54-11 30 15.2-15 47.8 8.5 54 23.4 6 29-41.8 54.2-41 25.3.7 24.6 45.3 48.6 43 24-2 4.4-45 31.4-47.4 27-2.4 34.7 61 60 54 25.4-7-27-39.6 0-51.8 24-10.8 63.4 38.7 94.3 43.7-4-27.3-12-60-42.8-93.3-43-46.5-98.3-78.5-153-78z" opacity="1" fill="#f9f9f9" fill-opacity="1"/>'

},{}],15:[function(require,module,exports){
exports.body = '<path d="M451 578c4.5 41.3 17 172.2 2.4 210.7-14.4 38.5 137.7 26.6 121.2 2.7-16.5-24-23-185-10.5-232.4 12.6-47.4-117.7-22.4-113 19z" fill="#c8b7b7" fill-rule="evenodd"/><path d="M573.8 793.8C537.6 743.6 545.6 675 557 622.6c-1 58 1.3 116.4 16.8 171.2z" fill="#e3dbdb" fill-rule="evenodd"/><path d="M680 775c-6.4 50 122.5 58.2 122 2.6-.4-55.6 9-218 20-269.3 11-51-107.6-79-104.7-5.7C720.3 576 686 725.2 680 775z" fill="#c8b7b7" fill-rule="evenodd"/><path d="M679.3 776.8c17.6-44.7 38.4-85 30-165.2z" fill="#ac9393" fill-rule="evenodd"/><path d="M591 277.5A266.6 192.6 0 0 0 324.3 470a266.6 192.6 0 0 0 110.3 156c-7.3 55.4-21.3 144.3-39.5 172-22.5 34.5 128.5 56.3 117.6 29.3-7.7-19.3 5-105.5 21-169.2a266.6 192.6 0 0 0 57 4.8 266.6 192.6 0 0 0 136.5-27.4c2 67.7-.5 141.2 1 173 2.6 50.4 131 36 121-18.6-8.2-43.8-22-155.6-26-225.5a266.6 192.6 0 0 0 34.2-94.2A266.6 192.6 0 0 0 591 277.6z" opacity="1" fill="#c8b7b7" fill-opacity="1"/><path d="M436.7 624.2c-6.3 59.8-18.3 119.3-42 175.2 45-47.6 45-113 42-175.2zM728.2 803c9.2-47 22.3-90.4-.7-167.8z" fill="#ac9393" fill-rule="evenodd"/><path d="M513 827c-24.6-56.8-2-122 20.5-170.8-13.4 56.6-24 114-20.6 170.8zM823.2 562.4c-9.3 79.4 6.8 155.5 26.5 231-11.3-74.4-22.8-148.8-26.5-231z" fill="#e3dbdb" fill-rule="evenodd"/>'

exports.tail = '<path d="M847 467.7c25.6 54 44.8 67 77.2 90.5-31.4-9.4-75.6-28.3-92.8-60.3-14.2-22.6 8.2-52.3 15.5-30.3z" fill="#c8b7b7" fill-rule="evenodd"/>'

exports.head = '<path d="M287 163.4c-83.7 0-151.5 64.8-151.5 144.7 0 33.3 12 65.5 33.8 91.2 41.3 81.5 110.6 163 2.6 250.5-21 20 13.5 41.8 34.3 24 89.3-70.2 70-146.3 69.7-221.4 41.7 9 62.5-6 75.5-26 118.3 93.5 160.5-17.2 191-134.8 16.7-79.8-53.3-104.2-124-54.6-26.7-45.5-77-73.5-131.5-73.6z" opacity="1" fill="#c8b7b7" fill-opacity="1"/><path d="M282 426.6c34.6 5.7 53.8 3.8 76.6-8-26.8 54.8-108 77-237.8 72-80.8-6-112.2-24 1.5-26.5 50.7-2.8 114.8-6.5 159.8-37.4z" fill="#f4e3d7" fill-rule="evenodd"/><path d="M521.6 220.7c32 32-19 303.2-161.6 212.5 112.4 83 153.5-25.4 183.5-140.4 7.4-35.7-2.5-60.2-22-72z" opacity="1" fill="#e3dbdb" fill-opacity="1"/><path d="M212.4 412.7c-10.2 2.8-20.5 7.2-30.7 8.5l2.7 5c8-5.5 18.4-9.2 28-13.5zm9 23.7c-9.2 2.5-18.2 6-27.3 8l2.3 4c7.5-4.7 16.5-8 25-12zm25 57.6c-9 .4-18.2 1.8-27 1.6l1.4 4c8-2.5 17-3.8 25.7-5.6zm-18 31l.5 2.2c6-.2 12.3 0 18.5 0-6.3-1-12.7-1.4-19-2.2zm2.7 33v1.4l12.2 2.4c-4-1.4-8-2.5-12-3.7zm-7.6 32.4c0 .3-.2.6-.4 1 3 1.4 5.7 3 8.6 4.4-2.6-2-5.4-3.7-8.2-5.4z" opacity="1" fill="#ac9393" fill-opacity="1"/>'

exports.eyes1 = '<path d="M269.5 296.2a16.2 14.7 0 0 1-16.2 14.8 16.2 14.7 0 0 1-16.2-14.8 16.2 14.7 0 0 1 16.3-14.7 16.2 14.7 0 0 1 16.2 14.7z" opacity="1" fill="#fff"/><path d="M260 299.5a9.4 9.2 0 0 1-9.4 9.2 9.4 9.2 0 0 1-9.4-9.2 9.4 9.2 0 0 1 9.4-9.2 9.4 9.2 0 0 1 9.4 9.2z" opacity="1" fill="#333"/>'

exports.eyes2 = '<path d="M241.4 301.4c16-4.8 25.7-16.5 37.2-26.4-8 8.8-6.6 17.6-25.7 26.4 20.3.2 22 15.5 32.8 23.5-14-12.2-29-21.5-44.4-23.6z" fill="#483737" fill-rule="evenodd" fill-opacity="1"/>'

exports.trees = '<path d="M183.2 637c30.4 13 57.6 16.7 67-33 44.6 7.6 98-90.6-17-82-1.8-38.5-22.5-30.5-42-25-23-48.3-51.6-77-104.6-20.4-161.5-20.7-39 103-20.5 82C88 667 138.7 637 183.3 636.8z" fill="#c6e9af"/><path d="M137.8 478.8c3 0 5.8 2.6 6.3 9.2-1.2 43.6-6.7 88 34 122l36.4-27.8-25-47.3c-5-11-1-29.5 15-10.7L229 571l34.2-26.2c22-10.7 18.4 7.8 9.3 15.8l-76 64.8c23.5 21.8 49.2 42.3 46.5 79l-46.3.7c1.3-13.3 4.6-26.7-7.6-40-17-22.5-34.2-43.5-51.3-72.4-4-6-6.8-12-8.6-18.3l-85.4-55.7c-10-6.8-16-24.6 7.3-17l75 43.7c.5-19 4.4-38.5 3.7-57.3 0-5 4.2-9.3 8-9.2z" opacity="1" fill="#decd87"/><path d="M753 644c-41 17.8-78 22.7-90.6-44.6-60.2 10.4-132.5-122.4 23-110.7 2.6-52 30.5-41.4 57-33.8 31-65.5 69.6-104.4 141.3-27.7 218.3-28 52.8 139 27.7 110.6-29.3 146.7-98 106.3-158.3 106z" fill="#c6e9af"/><path d="M814.5 430.2c-4 0-8 3.5-8.6 12.5 1.6 59 9 119-46 165L711 570l33.8-64c6.7-14.8 1-39.7-20.3-14.3l-33.3 63-46.3-35.3c-30-14.4-25 10.5-12.7 21.4L735 628.4c-31.7 29.5-66.5 57.3-62.8 106.7l62.7 1.2c-2-18-6.4-36.2 10-54.4 23.2-30.3 46.4-58.7 69.6-97.8 5.4-8 9-16.2 11.6-24.6L941.8 484c13.5-9.2 21.7-33.2-9.8-22.8l-101.6 59c-.7-25.7-6-52-5-77.5 0-7-5.6-12.6-11-12.5z" opacity="1" fill="#decd87"/>'

},{}],16:[function(require,module,exports){
exports.body = '<path d="M292.2 915.7c-12.2-67.3-99.6-138.2 34.2-198.5.2-45.8 18.7-91.5 41.5-137.2l237-1.4c30.8 44 52 68.2 57.2 148.6 125.4 42.3 59 125.6 37 182.8-131.8 25-267.6 26.4-407 5.7z" fill="#e9c6af" fill-rule="evenodd"/><path d="M279.2 929.2c-11-24 4.4-28.8 26-29.2 7-12.7 15.7-20 31.7 0 28-3.7 28.4 11 30.4 24.7-4.5 23.2-54.3 29.5-88.2 4.5zM707.2 915.6c11.2-24-4.3-28.8-26-29.2-7-12.6-15.6-20-31.6 0-28.2-3.7-28.6 11-30.5 24.7 4.6 23.3 54.4 29.6 88.2 4.6z" fill="#a05a2c" fill-rule="evenodd"/><path d="M362.2 581.4c-18 122.4-10 244.8-4.3 367.2l88.4 1.4C440 849 420 748 435 647.2l120-3c13 102-8.4 202.5-12.8 304.4H635c-3-120 11-230.2-27-371.4z" fill="#e9c6af" fill-rule="evenodd"/><path d="M290.7 401.4C185 71.7 784.3 166 652.2 410c-19.4 178.2-302 286-361.5-8.6z" fill="#e9c6af" fill-rule="evenodd"/><path d="M350.3 953.5c-14-30.6 5.5-36.7 33-37 8.8-16.3 19.6-25.4 40 0 35.6-5 36 14 38.4 31.3-5.7 29.6-68.6 37.5-111.4 5.7zM644 955.5c14.2-30.7-5.4-36.7-32.8-37.2-9-16-19.7-25.3-40 0-35.7-4.7-36 14-38.5 31.5 5.7 29.5 68.6 37.5 111.4 5.7z" fill="#a05a2c" fill-rule="evenodd"/><path d="M355 920.7l7.5-235.7 6 232.5zM544 921.7l-1.2-225 12.2 221c-3 .8-8.8 3-11 4zM289.3 900.7h13c-52-82.4-54.4-148 24-182.8-46.7 26.8-111 36.8-37 182.7z" fill="#deaa87" fill-rule="evenodd"/><path d="M707 890l-16.2-2c41-56.2 78.3-112.3-28.3-160.6 89 26.6 92.8 85 44.4 162.6zM429 916h10.6l-10.4-210.8zM616 918.7l10.8.6-10.5-210.5z" fill="#f4e3d7" fill-rule="evenodd"/><path d="M464.4 654.3c-5.3-3.8-9.8-9.6-14.2-18.2-2-3.5-4-6.6-4.8-7-.8 0-5 3.7-9.7 8.6-4.6 5-10 9.8-12 11-4.2 2.7-10 3-13.4.5-6-4-11.7-19.3-13.6-36.4-1.3-11.7-2.3-14.5-5.3-14.5-2.7 0-4.2 4.3-5 14-1 14.5-8.6 38.8-12 38.8-2 0-5.5-6.6-7.8-14.2-1-3.4-2.5-13.5-3.4-22.6-2-22.7-3-24.6-11.2-23-6 1-13.7 9.2-20 20.8-6 11.8-8 12.7-13.4 6.5-6.7-7.7-10.4-20-12.8-43.8-1-9-2-17.4-2.5-18.4-.5-1.3-2.2 1.8-6 10.7-5.2 12.6-10.4 21-13.5 22.3-2.5 1-5.7-2.7-9.8-11.2-7-14.6-11-34.5-12-59.3-1-19.7-1.7-25.3-3.4-27.6-1.5-2-1.6-2-3.2 0-1 1.2-3.2 7-5.2 13-4 12-7 17-9 15-3.4-3.2-1.8-40.3 2.6-62 1.2-5.8 2-11 1.5-11.4-.7-.7-1.7.4-13.5 13.6l-6 6.6.7-12.7c1-19 7.4-43 15.6-57.7 2.3-4 3.8-7.4 3.5-7.8-.4-.3-4.4 0-9 .8-10.5 1.8-11.3 1.2-8.7-6.7 3-9 23.4-48.5 31.6-61.3 7.4-11.3 8.7-14.3 6.2-14.3-.8 0-6.7 2.4-13.2 5.4-6.5 3-13 5.7-14.4 5.8-4.2.5-4-4.7.6-14 7-14.2 16.5-22.8 38.8-35 13.6-7.7 17.7-10.7 16.6-12.5-.4-.6-5.5-4-11.4-7.4-13.4-8-27-18-26.5-19.6.8-2 7.2-2.6 32.3-3.4 31.6-1 43-2.8 44.4-7 .2-.7-1.8-2.3-4.8-3.6-10.4-4.4-32.5-22.5-31-25.2 1-1.5 26.4-1.3 56.8.5 13.7.8 25.2 1 25.6.8.4-.4 1-12.8 1-27.6.6-28 1.4-33.4 5.4-34.6 3.3-1 8.7 2.4 17.6 11.4 10 10.2 18.2 21.8 26.6 38 3.6 6.8 6.5 11.3 6.8 10.4.3-1 1.6-10 2.8-20.3 2.3-19 4.5-29.4 6.6-31.4 2-2 7.5 1 13 7 7.2 8.3 13.4 19.3 19.2 34.6 2.8 7.5 5.6 13.6 6 13.6.6 0 11-9.3 23-20.7 23.2-21.8 28.8-26.3 37.5-30.5 6.2-3 10.2-3.3 11-1 .4.8-1 6.6-3.2 12.8-3.7 11-6.4 25-5.6 29.2L549 192c.6 4.7 1.5 8.5 2 8.5.2 0 3-4 6.3-8.5 11.7-17.5 39.7-49.7 43-49.7 2.4 0 2.8 8.7 1.5 30.2-1.8 31.6-.2 36 10.3 29.7 13.3-8 25-11.4 34.8-9.6 4.8 1 5 1 4.6 4.7 0 2-3 10.2-6.4 18-7.2 17-7.2 19 .2 26.3 2.7 2.7 11.6 9.6 19.8 15.5 8.2 6 18.2 14 22.2 18 12.8 12.7 21.6 28.6 19.8 35.8-1 3.5-6 5-17.6 5h-8.6l8.3 9.4c10.3 11.4 16 22.3 21.2 40.2 2 7.3 3.8 14 3.8 14.8 0 1.3-2.7 1.5-14.3 1.5-8 0-14.3.3-14.3.7 0 .4 3.5 4.5 8 9.2 11.3 12 21.7 31.3 21.7 40.2 0 2.7-.2 3-3.5 2.4-2-.4-7-2.6-11.4-5-14.6-8.6-18.4-7.4-15.4 5 1.8 7.7 3.8 21.3 6.8 46.4 1 8.2 2.6 18.5 3.5 23 2.2 11.2 2.2 13.3 0 14.7-2.7 1.8-10.6-.6-19.3-6-8.7-5-12.6-5.5-15.4-1.3-2 3.3-2.2 5.8-1.3 42.6.4 17 .2 21-1.6 28.3l-2.2 8.3-4.8-6.8c-5-7.3-9-18.2-9-25 0-13.6-10 8.8-15 34-3 14.5-5.2 21-7 21-1.4 0-2-2.6-2.8-12.6-.8-10-3-13.2-9.3-13.7-6-.4-12 3-22.3 12.7-10.7 10-15.3 19.5-16 33-.7 12.7-2 16.7-5.3 16.7-1.3 0-5.6-1.6-9.5-3.5-8.7-4.4-11-8.2-14.3-22.8-4-17.6-3.4-17.7-9.8 1.2-6.7 19.2-8.7 23.5-12.6 27.2-6.3 5.8-11.8-.2-19.6-21.8-2.7-7.2-5-13.2-5.4-13.2-.3 0-3.3 6.2-6.6 13.8-6.7 15.4-13.5 26.8-15.8 26.8-.8 0-3.4-1.4-5.8-3zm27.4-74.8c15-3.8 31-13 50.4-29.5 25.3-21 54.4-56.2 66.5-80.3 12.6-25 15-59.5 6.6-92.2-4.6-17.5-11.8-31-22.8-42.7-4.8-5-5.2-5.8-3.4-6.5 1.3-.4 5.2-2 9-3.8 13.8-6.5 29.3-27.4 30.8-41.7 1-8-3.6-19.3-13.2-33.8-7.4-11-13-17-18-19-8-3-23.3 6-44.2 26-12.8 12.2-9.8 12-27.2.5-20.4-13.6-26-15.3-51.2-15.3-25.6 0-30.7 1.2-57.5 13.8-25.2 12-21.8 11.7-29 1.6-11-15.7-28-28.4-40.2-30.4-8.8-1.4-22.4 9.3-29 23-6.6 13.2-7.8 26.8-3.3 38.3 5.2 13.4 22 33 32 37.3 2.6 1.2 4.7 2.8 4.7 3.6 0 .8-3 5-6.6 9.5-16 19.5-25 49.7-23.8 79.8.8 19.8 6.3 34.2 22.4 58.6 16.6 25.2 83.6 85.8 109 98.7 13.2 6.8 24.3 8 38.2 4.5z" opacity="1" fill="#a05a2c" fill-opacity="1"/><path d="M357.3 230c-22.7-22.3-82.2 51-5.2 97.3C316 293 307 245 357.4 230z" fill="#deaa87" fill-rule="evenodd" fill-opacity="1"/><path d="M585.8 233.5c22.7-22.2 83.8 61 2.6 95.7 36-34.2 48-80.6-2.6-95.7z" fill="#f4e3d7" fill-opacity="1" fill-rule="evenodd"/>'

exports.face = '<path d="M526 475l-26.2 3.8 10 29.2c4.8 12.4 14 16 16.2-3.8z" fill="#e6e6e6"/><path d="M519.8 518c-9 1.3-12.3-17-15-24.6 4 8.6 9.7 21.7 15 24.6z" fill="#c8b7b7"/><path d="M427.4 476l26.3 3.8-10 29.3c-4.8 12.5-14 16-16.3-3.7z" fill="#e6e6e6"/><path d="M427.4 495.3c-.2 9.2 0 25 7.8 23.7-4.8-4.8-6.7-14-7.8-23.7z" fill="#c8b7b7"/><path d="M423.2 386.3c-161.2 59-11 173.7 45.5 78.8zM530.2 384c161.2 59 11 173.8-45.5 79z" fill="#d38d5f"/><path d="M399 390.4c63.7-37 109-23.5 151.5-2-5.2 39.6-43 60.2-75.7 84.8-30-22-66.8-45.2-75.8-82.8z" fill="#784421"/><path d="M421.7 400.7c5.4-6 11.7-8.6 19-8l15.3 51c-10.3-14.7-10.5-31.8-34.3-43zM526 404c-5.4-6-11.7-8.6-19-8L491.8 447c10.3-14.5 10.5-31.6 34.3-42.8z" fill="#28170b"/><path d="M398.4 396.8c-27 16-65 65.7 4 104-78.6-21.4-59.4-77-4-104z" fill="#c87137"/><path d="M391.7 417.5c3.6 3 7 6 0 9-41.6-16.4-81.3-6-121.7-5.4 39.6-2.4 70.2-17.7 121.7-3.5zM400 436.8c4 2.3 8 4.5 2 9-44.2-7.7-81 10.6-120.4 19.4 38.3-10.6 65-31.7 118.4-28.4zM407.3 460.7c4.5 1 9 2 4.3 8-44.5 5.3-74.5 33.2-109.8 53 33.6-21 53.3-49 105.5-61z" fill="#502d16"/><path d="M556.7 395.5c27 16 65 65.7-4 104 78.6-21.4 59.4-77 4-104z" fill="#deaa87"/><path d="M547.7 442.8c-4 2.3-8 4.6-2 9 44.2-7.7 81 10.6 120.4 19.4-38.2-10.6-65-31.7-118.3-28.4zM556 423.6c-3.6 3-7 6 0 9 41.6-16.4 81.3-6 121.7-5.5-39.6-2.4-70.2-17.6-121.7-3.4zM540.4 466.8c-4.5 1-9 2-4.3 8 44.6 5.2 74.6 33.2 110 52.8-33.7-21-53.4-49-105.6-60.8z" fill="#502d16"/>'

exports.mouth = '<path opacity="1" fill="#e9afaf" fill-opacity="1" d="M431 468.4h90v127.4h-90z"/><path d="M427.8 548h97l-27 46.4h-41.4z" fill="#de8787" fill-rule="evenodd"/><path d="M427.8 548c15.2-2.5 34.8-16.4 50 0 27.8-15.7 30.6-.7 48-.7-28.4 20.2-73.2 27-98 .7z" fill="#d35f5f" fill-rule="evenodd"/><path d="M459.5 540c-10.8.4-22 6.4-31.5 8 6.5 7 14.4 11.5 23 14.2-2.8-8.5 1.8-15.3 9-22h-.5zM493 541.6l-2.6.7-10 4.3-2.3 1.3v-.3l-.6.2c6.8 1.4 13.4 3.3 19.3 6.7-1.7-4.3-4.7-8.3-3.7-13z" fill="#c83737" fill-rule="evenodd"/><path d="M521.5 594.4l-26.2-2.5 10-19.3c4.8-8 14-10.4 16.2 2.5zM435.8 594.6L462 592l-10-19c-4.8-8.2-14-10.5-16.2 2.4z" fill="#e6e6e6" fill-rule="evenodd"/><path d="M427.7 586c25.6-6.7 61.6-6.8 110 1 4.3 9.4 5.5 17.8-1 24.4l-10 20.2-10-14.2-11.3 22.3-10-24.3L483 672 466 618.4l-9 24.3-9-30.3-13.3 21.2-8.4-20c-6.5-9-5.6-18.7 1.4-27.5z" fill="#d38d5f" fill-rule="evenodd"/><path d="M428.7 585.7c-.5 0-1 .3-1.5.4-7 8.8-7.8 18.7-1.4 27.4l8.5 20.2.4-.7-6-47.3zm20.2 23.5l-1.5 3.5 8.7 29-1-28.6-6.3-3.8zm73 4l-8 1.7 1.7 3.2.4-.8 10.2 14-4-18.3zm-56.4.6l.4 6 16.8 52.2.6-3-5.3-47.3-12.4-8zm28.6 1l.5 1.3.2-.6 10 24.2 1-2-1-19-10.8-3.7z" fill="#c87137" fill-rule="evenodd"/><path d="M435.8 582c-.2-6 0-16.3 7.7-15.6-4.7 3.2-6.6 9.3-7.7 15.5zM515.3 566.2c-9-1-12.3 11-15 16 4-5.6 9.7-14 15-16z" fill="#c8b7b7" fill-rule="evenodd"/>'

exports.tail = '<path d="M478.4 871.3v30.4s140-43 205-42.5c65.2.7 176.8 40.4 176.8 40.4v-32.3S747.4 831 682.5 831c-65-.3-204 40.3-204 40.3z" fill="#e9c6af"/><path d="M826 874c31.4 68.6 81.4 37.3 112.8 14.4C899.4 862.8 843 836 826 874z" fill="#a05a2c"/>'

exports.grass1 = '<path d="M207.4 705l-6 70.6 40.6-74z" fill="#2ca05a" fill-rule="evenodd"/><path d="M259.3 963.3l-51-260 36-3.6zM259.3 970.6L149.6 685l-27 1.8z" fill="#5fd38d" fill-rule="evenodd"/><path d="M254 965l98.4-247 34.6-2z" fill="#5fd38d" fill-rule="evenodd"/><path d="M256.3 970.6l60-198.6H267z" fill="#5fd38d" fill-rule="evenodd"/><path d="M351.7 716L384 833.4l.7-117.2zM267.5 772l13.6 82.3 34.6-81.4zM121.8 686.8l-27 84.2 55.6-86z" fill="#2ca05a" fill-rule="evenodd"/>'

exports.grass2 = '<path d="M785.8 707l-4 41 28-43z" fill="#2ca05a" fill-rule="evenodd"/><path d="M821.7 857l-35.3-151 25-2zM821.7 861l-76-165.6-18.6 1z" fill="#5fd38d" fill-rule="evenodd"/><path d="M818 858l68.2-143.5 24-1z" fill="#5fd38d" fill-rule="evenodd"/><path d="M819.6 861l41.7-115H827z" fill="#5fd38d" fill-rule="evenodd"/><path d="M885.7 713.5l22.4 68 .6-68zM827.4 746l9.4 47.7 24-47.3zM726.5 696.5l-18.7 48.8 38.5-50z" fill="#2ca05a" fill-rule="evenodd"/>'

exports.eyes1 = '<path d="M441.8 343.3a23.6 21 0 0 1-23.6 21 23.6 21 0 0 1-23.5-21 23.6 21 0 0 1 23.5-21 23.6 21 0 0 1 23.6 21z" opacity="1" fill="#fff" fill-opacity="1"/><path d="M429 352a10 10.4 0 0 1-10 10.2 10 10.4 0 0 1-10-10.3 10 10.4 0 0 1 10-10.5 10 10.4 0 0 1 10 10.4z" opacity="1" fill="#000" fill-opacity="1"/><path d="M552.5 343a23.6 21 0 0 1-23.5 21 23.6 21 0 0 1-23.6-21 23.6 21 0 0 1 23.6-21 23.6 21 0 0 1 23.5 21z" opacity="1" fill="#fff" fill-opacity="1"/><path d="M538.6 350.7a10 10.4 0 0 1-10 10.4 10 10.4 0 0 1-10-10.3 10 10.4 0 0 1 10-10.3 10 10.4 0 0 1 10 10.3z" opacity="1" fill="#000" fill-opacity="1"/>'

exports.eyes2 = '<path d="M386 327.3c23.8 5 47.4 9.5 71 11.7-25.6 7-49 19.7-72 34 15.7-11.3 27.8-26 50-30.8-22.8-1-32.7-10-49-15zM566.2 327.3c-23.7 5-47.3 9.5-71 11.7 25.7 7 49.2 19.7 72 34-15.6-11.3-27.6-26-49.7-30.8 22.6-1 32.5-10 48.7-15z" fill="#a05a2c" fill-rule="evenodd"/>'

},{}],17:[function(require,module,exports){
exports.body = '<path d="M712.3 224.2c-68.3.6-146.3 22-215.2 24-55-13.7-111-16-169 7.4-81 53-68 130.4-8.4 202.7 14.7 70.3-16.7 121-43.5 173.3-33.2 3.2-67.6 8-47.7 31 20 23 70 25.3 105 1.3 51.3-20.3 70-82.3 100.5-129l55 76.3c21 14.4-31.5 20-36.5 43s113.2 25.8 110.5-10.7c-10-46.7-10.4-91.5-34.6-141 47 9.6 94 21.6 141-1.2 7 45.4 61 131 21.4 136.2-12.8 5-18.2-1.3-29.8 20.3-11.6 21.6 109.8 33.4 113.5-7.3l8.3-70c-5.3-47.5 50-92 72.2-161.5l.7-8.6c9.8-19.7 29.7-29.2 19-69.3-27.8-95-89.5-117.7-162.2-117z" opacity="1" fill="#f9f9f9"/><path d="M849 352.5c-85.5 84-71 168-89.5 252-3.3 14.4-8 27-24 28.8-24 9.3-57.6 13-77 25.3-5.8 20.7 110.6 31 114-8.6l.8-5.7c-.2-25 1.4-50.2 7-75.3.7-9.7 3.8-19.4 8.3-29.4 2.6-7.4 5.6-14.8 9-22.2 5.3-6.3 9.8-12.3 14-18 14.3-23 30.2-48 40-78l-5-20v.2c1-16.5 1-32.4 2.5-49zm-332.6 11.7c-92.5 149.6-185 305-282.2 304.5 23 16.4 66.4 15.8 97.6-5.6 51.2-20 70-82 100.3-129l.4.5 10-20.3c54.7-4 84.6 33.8 96.8 101.8 6 17.5-4 22-11 28.7-21.2 10.5-42.3 16.7-63.5 21.5 30.3 9.4 98.5 4.5 96.5-23.4-10-46.6-10.5-91.4-34.7-141 46.6 9.5 93.2 21.5 140-.6l.3-1.8c-6-43 8.2-86.2 14.3-129.2-33.7 108-114.5 89.5-198.4 62.7l33.8-68.8z" opacity="1" fill="#f2f2f2"/>'

exports.head = '<path d="M336.4 253.6l-7.8 3.3c-87.3 23.6-195.5 5.6-239 117L60 409.8c-9 7.6-8.7 15.2 2.4 22.7 7.7 7.5 13 16 34.7 18 26.8-.8 53 3 81-4.8 9.3-1 17-6.6 24-14.3-10 15.2 58.5 18 125.4 22.6l.5 2.4c70-40 152.3-93.6 8.4-202.8z" opacity="1" fill="#f9f9f9" fill-opacity="1"/><path d="M105 361.4c-3.7 4.8-.3 13.2 4.2 14.3 4.5 1 19 1.3 16.2-7.7-2.8-9-16.8-11.4-20.5-6.6z" opacity="1" fill="#fff"/><path d="M346 374.7c-47.2 39.4-90.3 31.3-132.7 15.6-38.5 55.5-98.8 33.2-150 43.2 7 7 12.8 15 33.5 16.8 27-.7 53.2 3 81.2-4.7 9.2-1 17-6.6 24-14.4l-.5.7.5-.5c-1 1.3-1 2.6-.8 3.8 4 11.7 65.6 14.3 126 18.6.2 0 .2 0 .2.2l.4 2 13-7.4c8.7-21.8 6.7-48 5-74z" opacity="1" fill="#f2f2f2" fill-opacity="1"/><path d="M106.2 363.6c-2.7 3.7-.2 10.2 3.3 11 3.4.7 14.5 1 12.4-6-2.2-7-13-8.7-15.8-5z" opacity="1" fill="#666"/><path d="M157 320.6c8-59.7 51.5-64 48.6-4.2-.4 15.6-11.6 17.4-11.7 7.5 8.5-40.2-11.3-59.4-37-3.4z" opacity="1" fill="#f2f2f2"/><path d="M59.8 409.7c11.4 11.4 6.8 17.6 3 24-11.4-6.3-22-12.7-3-24z" opacity="1" fill="gray"/>'

exports.leg = '<path d="M855.5 414c-71-35.6-109.4 40-72.2 161.5v-.5l32.3 46.6-18 18c-15.7 19.2 86.3 34.2 83.7 1C885.7 566.3 851 488 855.5 414z" opacity="1" fill="#f9f9f9"/><path d="M854 416.7c-19.3 14-40.4 6-33 66.2v2.3l24.3 108.5c10 35.5-5 36-16.7 40.6l-25-1.3-6 6.2c-15.8 19.3 86 34.3 83.5 1.2 4.4-72-28-147.3-26-219z" opacity="1" fill="#f2f2f2"/>'

exports.ice = '<path d="M142 612.5l5 27.6-77 24 61.5 300L903 963l63-304-15.6-12.8L958 604l-120.8-28.3-46 22-164.7-22-181 29-106-31.8-80 33z" fill="#fff" fill-rule="evenodd"/><path d="M148.4 963.8c-2-3.3-46.5-235.4-45.4-236.3 1.6-1.4 224-32 225-31 .5.8 35.7 263.2 35.8 267.3 0 .6-48.4 1-107.4 1-59 0-107.7-.4-108-1zM529.6 858.7L530 752l34.4-26.5c19-14.7 34.7-26.4 35-26 .8.7-8.8 262.4-9.7 263.4-.5.4-14.3 1-30.7 1.5l-29.8.8.4-106.6z" opacity=".8" fill="#afdde9" fill-opacity="1"/><path d="M131 961.7C128 949 71.5 668.5 71.8 668c.6-.4 108.6 8.4 109.3 9 .2.2-18 11-40.7 24.2-22.5 13-41 24.6-41 25.6 0 1.6 44 226.8 46 235 .7 3 .3 3-6.3 3-6.2 0-7.2-.3-8-3zM145.2 635.8l-2.2-11.3c-.8-4.2-1.4-8-1.3-8.4.2-.3 4 4 8.6 9.5l8.3 10-6.2 2-6.4 2-.8-3.7z" opacity=".8" fill="#afdde9" fill-opacity="1"/><path d="M367 963.4L349.2 829c-10.6-79.8-16.6-133.3-14.8-132.6 1.6.6 45.3 13.6 97 29l94 27.7v211.1h-79c-43.7 0-79.4-.2-79.4-.6zM594.3 932.3c1-17.5 3.2-76.4 5-130.8 1.8-54.5 3.5-99.3 3.7-99.6.2-.4 25.2 7.4 55.5 17.3l55 18-1 9.4c-.4 5.3-5.8 54.6-12 109.6-6 55-11 101.8-11 104 0 3-9.2 3.8-48.5 3.8h-48.4l1.7-31.7z" opacity=".8" fill="#87cdde" fill-opacity="1"/><path d="M693.5 953.5c1-5.8 6-52 11.6-102.5 12-109 12.5-113.6 16-111.6 4.7 3 2.2-3-9-21.2-6-10-10.7-18.5-10.3-19 .8-.7 189.7 25 191 26.2.8.6-34 198.3-40.8 231l-1.7 7.7H692l1.7-10.5z" opacity=".8" fill="#87cdde" fill-opacity="1"/><path d="M855 958c.8-3.7 11-58 22.4-121.2l21-114.5L886 704l-12.5-18.5 20.4-4.8c47-11 69.8-15.7 69.7-14 0 1-13.8 68-30.4 149l-30.3 147-24.8.8c-24.6.8-24.8.8-23.3-5.6zM930.6 629.6c-19.8-16.2-19.5-17.3 6-20.4 9.3-1 18.4-2.6 20.3-3.3 2.5-1 2.8 1.8 1 12.2-4 21.2-5.4 26.3-7.6 26-1.2 0-10-6.6-19.8-14.6z" opacity=".8" fill="#87cdde" fill-opacity="1"/>'

},{}],18:[function(require,module,exports){
exports.body = '<path d="M517.3 435.7c41.2-30.3 154.4-84.7 195.6-11.2 41.2 73.5-121.7 214.7-176.4 255-54.8 40-56.5 34.3-93 28.8-36.6-5.6-86.8-36.7-102.6-70.6-15.8-34-7-71.8 9.6-99.4 16.7-27.6 50.8-34 78.6-51.3 27.7-17 47-21 88-51.3z" opacity="1" fill="#de8787"/><path d="M437.8 673.8c-13.8-47.4 72-42.2 62.3-6.8-13.5 29.2-29.7 58.3-16.7 99.4L467 769c-5.6-32.4 3.7-65.5-29.2-95.2z" fill="#de8787"/><path d="M465.3 766.5c19.4 103.7-48.8 47-44 83.3 35.5-14.2 52-7.7 67.2 0 15.5-13.5 37.6-8 59.3-.8 22-20.3-59.3-2.4-63.3-84-9-7-15-6-19.2 1.5z" opacity="1" fill="#e5ff80"/><path d="M469 775.8c3.2 35.3-1.3 63.5-39.5 59.8 33 8 52.3-3.5 39.6-59.8z" fill="#decd87"/>'

exports.head = '<g transform="rotate(-3.92 832.158 453.813)"><path d="M766 282.3c-51.7 27.2-92.5 83.3-159.4 71.4-15-1.5-13.2 16.2 21 24-21.5 9.4-43.3 18.7 20.8 15.5-58.6 32.7-55.4 40 9.6 22-68.6 47.4-15 35.7 14 36-47.8 38.7-36 45 12 31.4-25.7 31-36.7 50 8.8 24.2-23.2 53.5 18 41.3 20.6 19 5-73.6 51-140 104.6-205 16-42-25.7-50-52-38.5z" opacity="1" fill="#e9afaf" fill-rule="evenodd"/><path d="M809.6 314c-23-20.7-58-24.4-46.7 13.6 11.2 38-2.5 25.3-20 31-17.4 5.7-66.2 79 27 32-65.4 78.2 17.7 48.3 23.3-7.6 5.7-56 39.3-48.2 16.3-69z" opacity="1" fill="#f55" fill-rule="evenodd"/><path d="M781 364.2c-.3-9.5-10.8-15 15.8-33.7 31.7-14 50.3-5 61 18-13.8-4.5-29-14.8-39-3.6 15.2.8 18.8 9.7 25.6 16.3-25-8-43.6-1-63.5 3z" opacity="1" fill="#e5ff80" fill-rule="evenodd"/><path d="M770 281.3c-12.6-22.5-54-54.6 11-51.2-1.8-53 15.7-21.4 38.7 35 13.2-16 32-51.5 15.8 33.4 54.8 20.2-4.3 20.2-16 18.7-17-33.7-33-26.8-49.6-35.7z" opacity="1" fill="#f55" fill-rule="evenodd"/><ellipse ry="9.4" rx="10" cy="316.3" cx="781" opacity="1" fill="#fff" fill-opacity="1"/><ellipse ry="6.6" rx="7.2" cy="318.1" cx="781" opacity="1" fill="#1a1a1a" fill-opacity="1"/></g>'

exports.tail = '<path d="M408 540c-90.7-8.4-174.3 7.6-237 95 39.6-127 131.7-127 237-95z" opacity="1" fill="#afe9c6"/><path d="M412 530c-78.4-46.6-160.7-68.2-255-16.3 90.5-97.7 173.6-58 255 16.3z" opacity="1" fill="#5fd38d"/><path d="M404.3 537.7c-21.6-29-50-49.7-57.8-95.2-18.2-41.8-36.3-21-54.4 2.2-68.5 50.6-78.8 11.5-112.2 8 24.6-12 59-9 61.2-54.4 9-72.2 10.7-115.2 112.3-58 101.5 57.4 37.4 131.6 51 197.4z" opacity="1" fill="#87deaa"/><path d="M399.8 546.8c23-88.2 20.6-173.3-55.6-249.4C463.4 357 448.5 448 399.8 546.8z" opacity="1" fill="#afe9c6"/><path d="M403.2 537.7c-173.2 22.6-176.5 123-65.8 275.5-45-132-10-216 65.8-275.5z" opacity="1" fill="#afe9c6"/><path d="M403.2 540c-60.7 9-164.4 37.6-141.7 222.2C200 702 226.8 403 403.2 540z" opacity="1" fill="#87deaa"/><path d="M402 535c-69.2-73.3-132-45-192.5 17.8-43.3 79.8-86.6 48-130 72C131 594 185 574 224 498.3c126.5-110 140.2-14.7 178 37z" opacity="1" fill="#5fd38d"/>'

exports.wing = '<path d="M494 476.5c33.5-26.3 59.7-32.2 63.3 22.7l-9 137c-18 29.7-30.8 41.2-30.6 4.7-23 21.2-46 43.3-75 44-61.3 28-48.2 13-32.7-3.3-40 8.7-112 36.4-40.8-20.4-127.3 30.4-51.5-6.8-36.3-23.8 27.3-25.5 70.5-126 161-161z" opacity="1" fill="#d35f5f" fill-rule="evenodd"/>'

exports.leg = '<path d="M453.3 695c-29.5-39.5 52.8-64.6 56-28-2.5 32-7.6 64.3 19 98.2l-13 10.3c-16.7-28.3-20.8-64-62-80.4z" fill="#de8787"/><path d="M511.4 772.4c54.4 90.4-29.3 61-12.2 93.5 28.4-26 46-25.6 63-23.6 10-18 32.5-20.7 55.4-21.5 13.6-26.8-56.4 18.4-88.7-56.8-13-3.4-17 1-17.6 8.2z" opacity="1" fill="#e5ff80"/><path d="M515.7 778.4c18 30.5 26 57.8-10 71 33.5-7 45.7-25.7 10-71z" fill="#decd87"/>'

},{}],19:[function(require,module,exports){
exports.head = '<path d="M203 349.8a161.5 135 86 0 0-5.4 1 161.5 135 86 0 0-87.4 74c-23 25.5-67.4 45.6-42.4 83.6-26.4 31 22 67 55 100.3a161.5 135 86 0 0 21 25v.2-.2a161.5 135 86 0 0 103.4 35.4v.6l264.3-54.6c39.8-5.5 72-178.8-28.4-200.4-68-10-138.6-12.6-213.2-58.3v1.3a161.5 135 86 0 0-66.8-8z" opacity="1" fill="#afc6e9" fill-opacity="1"/><path d="M175 504.8c-32.8 0-69.2 2.2-110 7.3-20 30.2 26 64.8 57.8 96.7a161.5 135 86 0 0 21 25v.2-.2A161.5 135 86 0 0 247 669.2v.6l264.4-54.5c6.8-1 13.3-6.8 19-15.8C424 565.8 347.8 504.7 175 504.8z" opacity="1" fill="white" fill-opacity="1"/><path d="M117.2 517.7c-18.8 26 .8 54 8 81.3-6.2-27.7-17-55-8-81.3zm39.4 0c-16.4 41.7 5.5 81.6 13.6 122.2-6.6-41-18.2-82.6-13.6-122.3zm-69.7.5c-11.8 15-2.5 28.6 2.4 42.4-3.2-14.2-7-28.3-2.5-42.4zm114 3.5c-19.3 35.3 7.7 83.5 35 131.8-15.3-42.7-44-80.5-35-131.8zm90.4 2.5c19.2 42.2 85.4 61 136 87.4-49.6-28-106-54-136-87.4zm-42.4 1c-5.7 37.4 44.7 72 75.3 107.6-27.7-35-66.6-65.8-75.3-107.6z" opacity="1" fill="#ac9393" fill-rule="evenodd"/><ellipse cx="215.7" cy="437.9" rx="21.4" ry="17.9" opacity="1" fill="#fff" fill-opacity="1"/><ellipse cx="215.7" cy="444.3" rx="11.4" ry="11.1" opacity="1" fill="#4d4d4d" fill-opacity="1"/>'

exports.body = '<path d="M592.4 348.6c-2.6 0-6 2-9.8 6l-47.6 61-67.6-1.2.8 192.7 228.8-3-3-171.8-76.2-15c-12.3-10-26.5-17.5-18.3-53-.8-10.6-3.2-15.5-7-15.6z" fill="#afc6e9" fill-rule="evenodd" opacity="1"/>'

exports.tail = '<path d="M692.7 430.8c-60.6-24-155 172.6-8.2 162.3 24-39 93.6-73 132.2-71 38.6 1.8 47.7 35.6 67.6 58.6C904 603.6 935 619 941 589c6-30.3-53.4-55.7-51-75.7 2.6-20 58.2 1 68.2-26 10-27.3 2.6-33.4-35.7-34.7-38.4-1.3-80.3 28.4-104.2 25-23.8-3.3-125.6-46.8-125.6-46.8z" opacity="1" fill="#afc6e9" fill-rule="evenodd"/>'

exports.splash1 = '<path d="M271.8 357.8l-6.4-43.6c-1.3-8.6 15.4-6.7 13.6 0z" fill="#fff" fill-opacity="1"/><path d="M104.3 528.6c39.8 24 88.2 25.6 147 0-50.2 9-100.4 17-147 0z" fill="#37abc8"/>'

exports.splash2 = '<path d="M271.5 352.2l4.3.8 7.8-79.3c21.7-22.3-39.6-22.3-19.4 0z" fill="#fff"/><path d="M96.4 560c52 24 115.3 25.6 192.2 0-65.7 9-131.3 17.2-192.2 0z" fill="#37abc8"/>'

exports.splash3 = '<path d="M271 353.3l-7.6-78.3c-10.4-12.8-22 14.3-33 22.5-1.4-32 57.5-103.7 93-.5-13.5-7.3-20.3-36.6-40.8-22l-7.8 79.8z" fill="#fff"/><path d="M77.5 576.4c62.3 24 138 25.6 230 0-78.7 9-157.2 17.2-230 0z" fill="#37abc8"/>'

exports.splash4 = '<path d="M233.6 292L219 311.7c-4 6.2 3 11.8 7.8 3.5l6.8-23zm75.6.8l10 22.2c3.8 6.3 12 3 7-5.2l-17-17z" fill="#fff"/><path d="M53.4 613.5c72.7 24 161 25.6 268.6 0-92 9-183.5 17.2-268.6 0z" fill="#37abc8"/>'


},{}]},{},[12]);
