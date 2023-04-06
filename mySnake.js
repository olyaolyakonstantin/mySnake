
var print123 = function(prefix){
	prefix = prefix
		?? '-> '
	// this is one of two cases where we need ";" in JS:
	// 	- leading ( .. ) / [ .. ] / { .. }
	// 	- for( .. ; .. ; .. ){ .. }
	;[1,2,3]
		.map(function(n){
			console.log(n) }) }


var DIRECTION_KEYS = {
			ArrowUp: 0,
	ArrowLeft: 1, ArrowRight: 3,
			ArrowDown: 2,
}

var setup = function() {
	var LIST = document.querySelectorAll('td')

	var snake = [Math.floor(Math.random() * 400)]
	var apple = Math.floor(Math.random() * 400)
	var score = 0

	//gate1 = Math.floor(Math.random() * 400)
	//gate2 = Math.floor(Math.random() * 400)

	//LIST.item(gate1).classList.add('grey')
	//LIST.item(gate2).classList.add('grey')
	var gate1 = undefined
	var gate2 = undefined


	LIST.item(apple).classList.add('orange')
	LIST.item(snake).classList.add('green')


	var direction = 'ArrowRight'

	var isPaused = false

	document.addEventListener("keydown",
		function(event) {
			isPaused =
				event.code == 'Space' ?
					true
					: false
			if(event.code in DIRECTION_KEYS
					&& (DIRECTION_KEYS[direction] - DIRECTION_KEYS[event.code])%2 != 0){
				direction = event.code
			}
		})


	var gameDraw = function(){
		if (!isPaused) {
			switch (direction) {
				case 'ArrowRight':
					snake.unshift(snake[0]+1)
					if(snake[0]%20 == 0){
						snake[0] -= 20
					}
					break

				case 'ArrowLeft':
					snake.unshift(snake[0]-1)
					if((snake[0]+1)%20 == 0){
						snake[0] += 20
					}
					break

				case 'ArrowUp':
					snake.unshift(snake[0]-20)
					if(snake[0] < 0){
					  	snake[0] += 400
					}
					break

				case 'ArrowDown':
					snake.unshift(snake[0]+20)
					if(snake[0] >= 400){
						snake[0] -= 400
					}
					break

				default:
					break
			}

			// teleporting
			if (snake[0] == gate1 || snake[0] == gate2) {
					snake[0] = snake[0] == gate1 ?
					 	gate2
						:gate1
			}

			//teleport every
			if (snake.length%3 == 0 && snake[0] == apple) {
				LIST.item(gate1).classList.remove('grey')
				LIST.item(gate2).classList.remove('grey')
				gate1 = Math.floor(Math.random() * 400)
				gate2 = Math.floor(Math.random() * 400)
				LIST.item(gate1).classList.add('grey')
				LIST.item(gate2).classList.add('grey')
			}

			var tail = snake.pop()

			for(let i of snake){
				LIST.item(i).classList.add('green')
			}
			LIST.item(tail).classList.remove('green')

			for(let i = 1; i < snake.length; i++) {
				if (snake[0] == snake[i]){
					clearInterval(tick)
				}
			}



			for(var i in snake) {
				if (snake[i] == apple) {
					score += 10
					if (snake[0] == apple) snake.push(tail)
					LIST.item(apple).classList.toggle('orange')
					apple = Math.floor(Math.random() * 400)
					LIST.item(apple).classList.toggle('orange')
				}
			}

			document.getElementById('score').innerHTML = 'score: '+ score
		}
    }

	var tick = setInterval(gameDraw, 90)
}
