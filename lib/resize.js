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
