module.exports = function(el, callback) {

// SVGs
	var svgsArr = document.getElementsByTagName('svg')
	el.svgs = []
	for(i=0;i<svgsArr.length;i++) { el.svgs.push(svgsArr[i]) }


// LION
	var lion = document.getElementById('lion')
	el.lion = {
		svg: lion,
		tail: lion.getElementById('tail'),
		mouth: lion.getElementById('mouth'),
		eyes1: lion.getElementById('eyes-1'),
		eyes2: lion.getElementById('eyes-2'),
		touch: lion.getElementById('touch')
	}	

// ELEPHANT 
	var elephant = document.getElementById('elephant')
	el.elephant = {
		svg: elephant,
		tail: elephant.getElementById('tail'),
		head: elephant.getElementById('head'),
		eyes1: elephant.getElementById('eyes-1'),
		eyes2: elephant.getElementById('eyes-2'),
		touch: elephant.getElementById('touch')
	}

// WHALE
	var whale = document.getElementById('whale')
	el.whale = {
		svg: whale,
		head: whale.getElementById('head'),
		tail: whale.getElementById('tail'),
		touch: whale.getElementById('touch'),
		splash1: whale.getElementById('splash-1'),
		splash2: whale.getElementById('splash-2'),
		splash3: whale.getElementById('splash-3'),
		splash4: whale.getElementById('splash-4')
	}

// POLAR 
	var polar = document.getElementById('polar')
	el.polar = {
		svg: polar,
		head: polar.getElementById('head'),
		leg: polar.getElementById('leg'),
		all: polar.getElementById('all'),
		touch: polar.getElementById('touch')
	}

// COW
	var cow = document.getElementById('cow')
	el.cow = {
		svg: cow,
		touch: cow.getElementById('touch'),
		eyes1: cow.getElementById('eyes-1'),
		eyes2: cow.getElementById('eyes-2'),
		mouth: cow.getElementById('mouth'),
		tail: cow.getElementById('tail')
	}

// ROOSTER
	var rooster = document.getElementById('rooster')
	el.rooster = {
		svg: rooster,
		touch: rooster.getElementById('touch'),
		head: rooster.getElementById('head'),
		tail: rooster.getElementById('tail'),
		wing: rooster.getElementById('wing'),
		leg: rooster.getElementById('leg')
	}
	callback()
}


