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
