var restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', restartGame);

var spinRoulette = document.querySelector('#roulette');
spinRoulette.addEventListener('click', goGame);

var currentGamerElem = document.querySelector('#currentGamer');

var currentGamer = getFirstGamer();
var cells = getFieldCells('#field td');
prepareField();

// готовим ячейки к игре
function prepareField(){
	activateCell(cells);

	currentGamer = getFirstGamer();
	showCurrentGamer(currentGamer, currentGamerElem);
}

// Заменяем крестик на нолик или наоборот
function nextStep(){
	var cell = this;
	fillCell(cell, currentGamer);

	currentGamer = changePlayer(currentGamer);

	showCurrentGamer(currentGamer, currentGamerElem);
	
	blockCell(cell);

	var winner = checkWin(cells);
	if(winner !== false){
		endGame(cells, winner, currentGamerElem);
	}else{
		var isFilled = checkFieldFilled(cells);
		if(isFilled){
			endGame(cells, winner, currentGamerElem);
		}
	}
}

// Вызываемая функция при выиграше или спустя 9-ти ходов
function endGame(cells, winner, currentGamerElem){
	stopGame(cells);
	showWinner(winner);
	showCurrentGamer('-', currentGamerElem);
}

function restartGame(){
	prepareField(cells);
}

/******************************
	Выше идут основные функции
	Ниже вспомогательные
*******************************/
function fillCell(cell, content){
	cell.innerHTML = content;
}

// Смена игрока
function changePlayer(currentGamer){
	if(currentGamer == 'x'){
		return '0';
	}else{
		return 'x';
	}
}

// Блокировка ячейки после хода
function blockCell(cell){
	cell.removeEventListener('click', nextStep);
}

function activateCell(cell){
	for(let i = 0; i < cells.length; i++){
		cells[i].innerHTML = '';
		cells[i].addEventListener('click', nextStep);
	}
}

// получаем игровое поле
function getFieldCells(selector){
	return document.querySelectorAll(selector);
}

function stopGame(cells){
	for(let i = 0; i < cells.length; i++){
		cells[i].removeEventListener('click', nextStep);
	}
}

function showWinner(winner){
	if(winner !== false){
		alert(winner);
	}else{
		alert('Ничья!');
	}
	
}

function showCurrentGamer(name, elem){
	elem.innerHTML = name;
}

function getFirstGamer(){
	return 'x';
}
// false - ничья, 'x' - победитель 'x' или '0' если победитель '0'
function checkWin(cells){
	let winCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for(let i = 0; i < winCombinations.length; i++){
		let winCombo = winCombinations[i];

		if(
			cells[winCombo[0]].innerHTML == cells[winCombo[1]].innerHTML &&
			cells[winCombo[1]].innerHTML == cells[winCombo[2]].innerHTML &&
			cells[winCombo[1]].innerHTML != ''
			){
				return cells[winCombo[0]].innerHTML;
		}
	}
	return false;
}

function checkFieldFilled(cells){
	for(let i = 0; i < cells.length; i++){
		if(cells[i].innerHTML == ''){
			return false;
		}
	}
	return true;
}
/////////////////////////////////////////////////////////////////////////
function goGame(){
	var bol = roulette();
	if(bol === true){
		alert('Начинает ход Х');
	}else{
		alert('Начинает ход 0');
	}
}
function roulette(){
	var random_boolean = Math.random() >= 0.5;
	return random_boolean;
}