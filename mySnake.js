
//в LIST помещается список всех ячеек из таблицы
var LIST

var DIRECTION  = -1 // направление
var STEP = 19 // шаг

// random_number  - ранд знач от 0 до 399
var POSITION = Math.floor(Math.random() * 400);


var changeStep = function(){
	STEP = STEP == 19 ?
		21
		: 19
}



var setup = function(){
	LIST = document.querySelectorAll('td') 

	//toggle - вкл/выкл цвета ячейки
	LIST.item(POSITION).classList.toggle('green') 

	//функция работает с заданным интервалом (тут с 150мс)
	var beep = setInterval(function(){ 
		LIST.item(POSITION).classList.toggle('green')

		if((POSITION + STEP * DIRECTION ) > 399 
				|| (POSITION + STEP * DIRECTION ) < 0){ 
			DIRECTION  *= -1 
			changeStep()  
		}

		if((POSITION+1) % 20 == 0 
				|| POSITION % 20 == 0){ 
			changeStep()
		}
		POSITION += DIRECTION  * STEP

		LIST.item(POSITION).classList.toggle('green')
	}, 150)

	//clearInterval(beep)

}




