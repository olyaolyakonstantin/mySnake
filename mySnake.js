
var print123 = function(prefix){
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

	var LIST = document.querySelectorAll('td')

	var height = document.querySelectorAll('tr').length
	var cellCount = LIST.length
	var width = cellCount / height

	var snake = [Math.floor(Math.random() * cellCount)]

	var apple = Math.floor(Math.random() * cellCount)
	var score = 0

	var gate1 = undefined
	var gate2 = undefined

	var step = 1


	LIST.item(apple).classList.add('orange')
	LIST.item(snake).classList.add('green')

	var wall = [Math.floor(Math.random() * cellCount)]


// Wall setup v.1
/*
	for (i=0; i<8; i++){
		if ((wall[i] + width) < cellCount){
				wall.push(wall[i] + width)
		}
	}
*/

	var direction = 'right'

	var isPaused = false

	document.addEventListener("keydown",
		function(event) {
			var key = KEYS[event.code]
			isPaused =
				key == 'pause' ?
					true
					: false
			if(key in DIRECTIONS
					&& (DIRECTIONS[direction] - DIRECTIONS[key])%2 != 0){
				direction = key
			}
		})


	var gameDraw = function(){
		if (!isPaused) {

			//* XXX Q: which implementation is better?
			// XXX pros and cons:
			// 		+ better editablity
			// 			no logic du[plication
			// 		- worse readabilit
			// size of step...
			var step = (direction == 'up'
					|| direction == 'down') ?
				width
				: 1
			// direction of step...
			var d = (direction == 'up'
					|| direction == 'left') ?
				-1
				: 1
			// move the snake...
			snake.unshift(snake[0] + step*d)
			// overflow: vertcal
			if(snake[0] < 0
					|| snake[0] >= cellCount){
				snake[0] += cellCount * -d
			// overflow: horizontal...
			} else if((direction == 'left'
						&& (snake[0]+1)%width == 0)
					|| (direction == 'right'
						&& snake[0]%width == 0)){
				snake[0] += width * -d
			}


			/*/
			// XXX pros and cons:
			// 		+ better readability
			// 			simpler structure
			// 		- worse editability
			// 			logic duplication in two differenet ways
			switch (direction) {
				case 'up':
					snake.unshift(snake[0]-width)
					if(snake[0] < 0){
					  	snake[0] += cellCount
					}
					break
				case 'down':
					snake.unshift(snake[0]+width)
					if(snake[0] >= cellCount){
						snake[0] -= cellCount
					}
					break
				case 'left':
					snake.unshift(snake[0]-1)
					if((snake[0]+1)%width == 0){
						snake[0] += width
					}
					break
				case 'right':
					snake.unshift(snake[0]+1)
					if(snake[0]%width == 0){
						snake[0] -= width
					}
					break
			}
			//*/


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

				gate1 = Math.floor(Math.random() * cellCount)
				gate2 = Math.floor(Math.random() * cellCount)

				LIST.item(gate1).classList.add('grey')
				LIST.item(gate2).classList.add('grey')
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

			var tail = snake.pop()

			//green color in snake
			for(let i of snake){
				LIST.item(i).classList.add('green')
			}
			LIST.item(tail).classList.remove('green')

			// grey color in wall
			for (var i in wall) {
				LIST.item(wall[i]).classList.add('grey')
			}


			for(let i = 1; i < snake.length; i++) {
				if (snake[0] == snake[i]) {
					clearInterval(tick)
				}
			}

			for(var i in snake) {
				if (snake[i] == apple) {
					score += 10
					if (snake[0] == apple) {
						snake.push(tail)

						// grow the wall


						//	if
						if (LIST.item(wall[0] + step*d).classList.contains('grey')) {
							//LIST.item(0).classList.add('pink')
							wall.unshift(Math.random() * cellCount)
						} else {
								wall.unshift(wall[0] + step*d)
						}

						// overflow: vertcal
						if(wall[0] < 0
								|| wall[0] >= cellCount){
							wall[0] += cellCount * -d
						// overflow: horizontal...
						} else if((direction == 'left'
									&& (wall[0]+1)%width == 0)
								|| (direction == 'right'
									&& wall[0]%width == 0)){
							wall[0] += width * -d
						}

					}
					LIST.item(apple).classList.toggle('orange')
					apple = Math.floor(Math.random() * cellCount)

					// if
					if (wall.includes(apple)) {
						apple = Math.floor(Math.random() * cellCount)
					} else {
							LIST.item(apple).classList.toggle('orange')
					}

				}
			}

			document.getElementById('score').innerHTML = 'score: '+ score
		}
  }

	var tick = setInterval(gameDraw, SPEED)
}

// vim:set sw=4 ts=4 :
