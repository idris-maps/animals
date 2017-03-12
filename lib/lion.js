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
