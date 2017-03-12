var Siema = require('siema')

module.exports = function(app) {
	app.siema = new Siema({
		selector: '#page',
		loop: true
	})
}
