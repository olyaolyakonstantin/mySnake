//в List помещается список всех ячеек из таблицы
var List = document.querySelectorAll('td') 

// n  - ранд знач от 0 до 399
var n = getRandomInt(400) 

List.item(n).classList.toggle('green') //toggle - вкл/выкл цвета ячейки
var dir = -1 // направление
var step = 19 // шаг

var beep = setInterval(function(){ //функция работает с заданным интервалом (тут с 150мс)
    List.item(n).classList.toggle('green')
    if ((n + step * dir) > 399 ||(n + step * dir) < 0) { 
        dir *= -1 
        changeStep()  
    }

    if ((n+1) % 20 == 0 || n % 20 == 0) { 
        changeStep()
    }
    n += (dir*step)
    List.item(n).classList.toggle('green')
}, 150)

clearInterval(beep)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var changeStep = function(){
    if (step == 19) { step = 21 }
    else { step = 19 }
}
