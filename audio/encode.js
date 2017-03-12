var fs = require('fs')

var soundFiles = fs.readdir('opt', function(err, list) {
	var sounds = list.map(function(x) { return x.split('.')[0] })
	loop(0, sounds, {}, function(obj) {
		fs.writeFile('sounds.json', JSON.stringify(obj), 'utf-8', function() {
			console.log('done encoding')
		})
	})
})

function loop(i, sounds, obj, callback) {
	if(i === sounds.length) { callback(obj) }
	else {
		encode(sounds[i], function(buff) {
			obj[sounds[i]] = buff
			loop(i+1, sounds, obj, callback)
		})
	}
}

function encode(file, callback) {
	fs.readFile('opt/' + file + '.mp3', 'utf-8', function(err, bitmap) {
		callback(new Buffer(bitmap).toString('base64'))
	}) 
}
