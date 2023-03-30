var setup = function() {
  var LIST = document.querySelectorAll('td')

  var snake = [Math.floor(Math.random() * 400)]
  var apple = Math.floor(Math.random() * 400)
  var score = 0;

  LIST.item(apple).classList.add('orange')
  LIST.item(snake).classList.add('green')

  var dir = 'ArrowRight'

  var isPaused = false;

  document.addEventListener("keydown", direction);

  function direction(event) {

      isPaused = event.code == 'Space' ? true : false

      if(event.code == 'ArrowRight' && dir != 'ArrowLeft')
            dir = 'ArrowRight';
      else if(event.code == 'ArrowDown' && dir != 'ArrowUp')
            dir = 'ArrowDown';
      else if(event.code == 'ArrowLeft' && dir != 'ArrowRight')
            dir = 'ArrowLeft';
      else if(event.code == 'ArrowUp' && dir != 'ArrowDown')
            dir = 'ArrowUp';
  }


  var gameDraw = function(){
    if (!isPaused) {
        switch (dir) {
            case 'ArrowRight':
            snake.unshift(snake[0]+1)
            if (snake[0]%20==0) snake[0]-=20
            break;

            case 'ArrowLeft':
            snake.unshift(snake[0]-1)
            if ((snake[0]+1)%20==0) snake[0]+=20
            break;

            case 'ArrowUp':
            snake.unshift(snake[0]-20)
            if (snake[0]<0) snake[0]+=400
            break;

            case 'ArrowDown':
            snake.unshift(snake[0]+20)
            if (snake[0]>=400) snake[0]-=400
            break;

            default:
            break;
        }

        var tail = snake.pop()

        for (let i of snake) LIST.item(i).classList.add('green')
        LIST.item(tail).classList.remove('green')

         for (let i = 1; i < snake.length; i++) {
            if (snake[0] == snake[i]) clearInterval(beep)
        }

        for (let i in snake) {
            if (snake[i] == apple) {
                score += 10
                if (snake[0] == apple) snake.push(tail)
                LIST.item(apple).classList.toggle('orange')
                apple = Math.floor(Math.random() * 400)
                LIST.item(apple).classList.toggle('orange')

            }
        }
        document.getElementById('score').innerHTML = 'score: '+ score;
      }
    }
  var beep = setInterval(gameDraw, 90)

}
