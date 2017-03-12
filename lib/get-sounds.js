module.exports = function(sounds, callback) {
	sounds.lion = new Audio('lion.mp3')
	sounds.elephant = new Audio('elephant.mp3')
	sounds.whale = new Audio('whale.mp3')
	sounds.polar = new Audio('polar.mp3')
	sounds.cow = new Audio('cow.mp3')
	sounds.rooster = new Audio('rooster.mp3')
	callback()
}
