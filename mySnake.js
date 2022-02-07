
//в List помещается список всех ячеек из таблицы
var List

var dir = -1 // направление
var step = 19 // шаг

// n  - ранд знач от 0 до 399
var n = Math.floor(Math.random() * 400);


var changeStep = function(){
	step = step == 19 ?
		21
		: 19
}



var setup = function(){
	List = document.querySelectorAll('td') 

	//toggle - вкл/выкл цвета ячейки
	List.item(n).classList.toggle('green') 

	//функция работает с заданным интервалом (тут с 150мс)
	var beep = setInterval(function(){ 
		List.item(n).classList.toggle('green')

		if((n + step * dir) > 399 
				|| (n + step * dir) < 0){ 
			dir *= -1 
			changeStep()  
		}

		if((n+1) % 20 == 0 
				|| n % 20 == 0){ 
			changeStep()
		}
		n += dir * step

		List.item(n).classList.toggle('green')
	}, 150)

	//clearInterval(beep)

}




