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
