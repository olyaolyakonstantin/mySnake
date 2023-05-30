var SPEED = 110

// Keyboard control configuation
//
// Format:
//	{
//		<key-name>: <command>,
//		...
//	}
//
//	<key-name> as is returned by event.code
//
var KEYS = {
	ArrowUp: 'up',
	ArrowDown: 'down',
	ArrowLeft: 'left',
	ArrowRight: 'right',

	KeyW: 'up',
	KeyS: 'down',
	KeyA: 'left',
	KeyD: 'right',

	Space: 'pause',
}

var DIRECTIONS = {
	up: 0,
	left: 1,
	down: 2,
	right: 3,
}



var snake = {
	body: undefined ,
	draw: function() {
		for (var i in snake.body) {
			field.cells.item(snake.body[i]).classList.add('green') }
		field.cells.item(snake.body.pop()).classList.remove('green')
	},
	direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random()*4)],
}

var field = {
	cells: undefined,
	height: undefined,
	width: undefined,

	cellCount: undefined,
}

var apple = {
	position: undefined,

	replace: function() {
		field.cells.item(apple.position).classList.remove('orange')
		apple.position = Math.floor(Math.random() * field.cellCount)
		field.cells.item(apple.position).classList.add('orange')
	}
}

var wall = {
	cells: undefined,

	draw: function() {
		for (var i in wall.cells) {
			field.cells.item(wall.cells[i]).classList.add('grey') }
	}
}


var overflow = function(cells, d) {
	// overflow: vertcal
	if (cells[0] < 0
			|| cells[0] >= field.cellCount){
		cells[0] += field.cellCount * -d
	// overflow: horizontal
	} else if((snake.direction == 'left'
				&& (cells[0]+1)%field.width == 0)
			|| (snake.direction == 'right'
				&& cells[0]%field.width == 0)){
		cells[0] += field.width * -d
	}
}

var setup = function() {

	field.cells = document.querySelectorAll('td')
	field.height = document.querySelectorAll('tr').length
	field.cellCount = field.cells.length
	field.width = field.cellCount / field.height

	snake.body = [Math.floor(Math.random() * field.cellCount)]
	//field.cells.item(snake.body).classList.add('green')

	apple.position = Math.floor(Math.random() * field.cellCount)
	field.cells.item(apple.position).classList.add('orange')

	var score = 0
	//var gate1 = undefined
	//var gate2 = undefined
	var step = 1

	wall.cells = [Math.floor(Math.random() * field.cellCount)]

	var isPaused = false

	document.addEventListener("keydown",
		function(event) {
			var key = KEYS[event.code]
			isPaused =
				key == 'pause' ?
					true
					: false
			if(key in DIRECTIONS
					&& (DIRECTIONS[snake.direction] - DIRECTIONS[key])%2 != 0){
				snake.direction = key
			}
		})

	var gameDraw = function(){
		if (!isPaused) {

			// size of step
			var step = (snake.direction == 'up'
					|| snake.direction == 'down') ?
				field.width
				: 1
			// direction of step
			var d = (snake.direction == 'up'
					|| snake.direction == 'left') ?
				-1
				: 1

			snake.body.unshift(snake.body[0] + step*d)
			overflow(snake.body, d)

			//XXX
			snake.draw()
			wall.draw()

			/*
			// teleports the snake from gate to gate
			if (snake[0] == gate1 || snake[0] == gate2) {
					snake[0] = snake[0] == gate1 ?
						gate2
						: gate1
					direction = DIRECTIONS_IDX[(DIRECTIONS[direction]+1) % 4]
			}
			// teleports the gates every 30 points
			if (snake.length%3 == 0 && snake[0] == apple) {
				LIST.item(gate1).classList.remove('grey')
				LIST.item(gate2).classList.remove('grey')
				gate1 = Math.floor(Math.random() * field.cellCount)
				gate2 = Math.floor(Math.random() * field.cellCount)
				LIST.item(gate1).classList.add('grey')
				LIST.item(gate2).classList.add('grey')
			}
			*/

			// gameover snake crash
			for (var i = 1; i < snake.body.length; i++) {
				if (snake.body[0] == snake.body[i]) {
					clearInterval(tick)
				}
			}


			//snake eats APPLE
			if (snake.body[0] == apple.position) {
				score += 10
				snake.body.push(snake.body.length + 1)
				apple.replace()

				//grow the WALL
				if (field.cells.item(wall.cells[0] + step*d).classList.contains('grey')) {
					wall.cells.unshift(Math.random() * field.cellCount)
				} else {
					wall.cells.unshift(wall.cells[0] + step*d)
				}
				overflow(wall.cells, d)
			}

			// doesn't work :\
			//  MAKE AN IXCEPTION FOR APPLE IN THE WALL
			/*
			if (wall.includes(apple)) {
				apple = Math.floor(Math.random() * field.cellCount)
			} else {
				LIST.item(apple).classList.toggle('orange')
			}
			*/
			document.getElementById('score').innerHTML = 'score: '+ score
		}
	}

	var tick = setInterval(gameDraw, SPEED)
}

