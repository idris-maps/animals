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
