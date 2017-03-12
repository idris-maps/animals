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




