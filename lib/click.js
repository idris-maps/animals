module.exports = function(el, callback) {
	el.addEventListener('mouseup', function() {
		callback()
	})
	el.addEventListener('touchend', function() {
		callback()
	})
}
