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
