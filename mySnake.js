
var print123 = function(prefix){
	// "??" checks if the first operand is null or undefined, if no 
	// returns it else returns the second operand...
	prefix = prefix
		?? '-> '
	// this is one of two cases where we need ";" in JS:
	// 	- leading ( .. ) / [ .. ] / { .. }
	// 	- for( .. ; .. ; .. ){ .. }
	;[1,2,3]
		.map(function(n){
			console.log(n) }) }


var SPEED = 90

// Keyboard control configuation
//
// Format:
// 	{
// 		<key-name>: <command>,
// 		...
// 	}
//
// 	<key-name> as is returned by event.code
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
var DIRECTIONS_IDX = Object.keys(DIRECTIONS)


var setup = function() {

	var field = {
		cells: document.querySelectorAll('td'),

		height: undefined,
		width: undefined,

		cellCount: undefined,

		colorCell: function(i, cls){
			if(this.cells[i].classList.length > 0){
				return undefined
			}
			this.cells[i].classList.add(cls)
			return  this
		},
		colorRandomCell: function(cls){
			// XXX naive way -- fix this...
			var tries = 10
			do {
				var i = Math.floor(Math.random() * this.cellCount)
			} while(this.colorCell(i, cls) == null 
				&& --tries > 0)
			return i
		},
	}
	// XXX use props for these attributes...
	field.height = document.querySelectorAll('tr').length
	field.cellCount = field.cells.length
	field.width = field.cellCount / field.height


	var dfl_snake_color = 'snake-green'
	var snake = {
		color: dfl_snake_color,
		cells: [field.colorRandomCell(dfl_snake_color)],
		direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random()*4)],
	}

	// place apple...
	field.colorRandomCell('apple')

	// wall...
	field.colorRandomCell('wall')

	var score = 0

	var gate1 = undefined
	var gate2 = undefined

	var step = 1





// Wall setup v.1
/*
	for (i=0; i<8; i++){
		if ((wall[i] + field.width) < field.cellCount){
				wall.push(wall[i] + field.width)
		}
	}
*/

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


	var action_queue_pre = []
	var action_queue_post = []
	var game = {
		field: field,
		snake: snake,
	}
	var gameStep = function(){
		if (!isPaused) {
			for(var action of action_queue_pre){
				action.call(game)
			}
			for(var action of action_queue_post){
				action.call(game)
			}
		}
	}

	// snake...
	action_queue_pre
		.push(function(){
			var snake = this.snake
			var cells = snake.cells
			var field = this.field

			//* XXX Q: which implementation is better?
			// XXX pros and cons:
			// 		+ better editablity
			// 			no logic du[plication
			// 		- worse readabilit
			// size of step...
			var step = (snake.direction == 'up'
					|| snake.direction == 'down') ?
				field.width
				: 1
			// direction of step...
			var d = (snake.direction == 'up'
					|| snake.direction == 'left') ?
				-1
				: 1
			// move the snake...
			cells.unshift(cells[0] + step*d)
			// overflow: vertcal
			if(cells[0] < 0
					|| cells[0] >= field.cellCount){
				cells[0] += field.cellCount * -d
			// overflow: horizontal...
			} else if((snake.direction == 'left'
						&& (cells[0]+1)%field.width == 0)
					|| (snake.direction == 'right'
						&& cells[0]%field.width == 0)){
				cells[0] += field.width * -d
			}
			snake.tail = cells.pop()
		})
	action_queue_post
		.push(function(){
			var field = this.field
			var snake = this.snake
			var cells = snake.cells
			var tail = snake.tail

			// snake...
			for(let i of cells){
				field.colorCell(i, snake.color)
			}
			field.cells.item(tail).classList.remove(snake.color)

			// snake self-collision...
			for(let i = 1; i < cells.length; i++) {
				if (cells[0] == cells[i]) {
					clearInterval(tick)
				}
			}
		})


	// apple...
	action_queue_pre
		.push(function(){
			var head = this.snake.cells[0]
			if (this.field.cells[head].classList.contains('apple')) {
				this.snake.cells.push(this.snake.tail)

				this.field.cells.item(head).classList.remove('apple')
				this.field.colorRandomCell('apple')
			}
		})

	// wall...
	action_queue_pre
		.push(function(){
			var head = this.snake.cells[0]
			// snake hits wall...
			if (this.field.cells[head].classList.contains('wall')){
				clearInterval(tick)
			}
		})
	
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
				field.cells.item(gate1).classList.remove('grey')
				field.cells.item(gate2).classList.remove('grey')

				gate1 = Math.floor(Math.random() * field.cellCount)
				gate2 = Math.floor(Math.random() * field.cellCount)

				field.cells.item(gate1).classList.add('grey')
				field.cells.item(gate2).classList.add('grey')
			}
			*/

			/*
			// snake against the wall
			for (var i in wall) {
				if (snake[0] == wall[i]) {
					clearInterval(tick)
				}
			}
			*/

/*
			for(var i in snake) {
				if (snake[i] == apple) {
					score += 10
					if (snake[0] == apple) {
						snake.push(tail)

						// grow the wall


						//	if
						if (field.cells.item(wall[0] + step*d).classList.contains('grey')) {
							//field.cells.item(0).classList.add('pink')
							wall.unshift(Math.random() * field.cellCount)
						} else {
								wall.unshift(wall[0] + step*d)
						}

						// overflow: vertcal
						if(wall[0] < 0
								|| wall[0] >= field.cellCount){
							wall[0] += field.cellCount * -d
						// overflow: horizontal...
						} else if((direction == 'left'
									&& (wall[0]+1)%field.width == 0)
								|| (direction == 'right'
									&& wall[0]%field.width == 0)){
							wall[0] += field.width * -d
						}

					}
					field.cells.item(apple).classList.toggle('apple')
					apple = Math.floor(Math.random() * field.cellCount)

					// if
					if (wall.includes(apple)) {
						apple = Math.floor(Math.random() * field.cellCount)
					} else {
							field.cells.item(apple).classList.toggle('apple')
					}

				}
			}

			document.getElementById('score').innerHTML = 'score: '+ score
		}
	}
//*/

	var tick = setInterval(gameStep, SPEED)
}

// vim:set sw=4 ts=4 :
