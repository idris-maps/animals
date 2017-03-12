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
