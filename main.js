

const winnerDiv = document.getElementById("winner");

let ai = 'X';
let human = 'O';
// let score = 0;


function getBoard(){
	allCells = document.querySelectorAll(".cell");
	cellsArr = Array.from(allCells);
	return [
      [cellsArr[0], cellsArr[1], cellsArr[2]],
      [cellsArr[3], cellsArr[4], cellsArr[5]],
      [cellsArr[6], cellsArr[7], cellsArr[8]],
    ]	
}



function handleClick(event){

	if(event.target.innerHTML === ""){
		event.target.innerHTML = human;
		openSpots--;
	}
	
	// currentPlayer = ai;
	opponentTurn();
}
	let openSpots = 9;
function opponentTurn(){
	let board = getBoard()

	let bestScore = -Infinity;
	let bestMove = {
			i: 0,
			j: 0
		};
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++){
			if(board[i][j].innerHTML == ''){
				board[i][j].innerHTML = ai;
				// console.log(board);
				
				let score = minimax(board, 0, false);
				board[i][j].innerHTML = '';
				if(score > bestScore){
					bestScore = score;
					bestMove = { i, j };
					// console.log(bestMove)
				}
			}
		}
	}

	if(openSpots > 0){
		board[bestMove.i][bestMove.j].innerHTML = ai;
		

		openSpots--;
		console.log(openSpots)
	}
	let result = checkWinner();
	if(result != null && result != "tie") {
		winnerDiv.innerHTML = `${result} Wins!`;
	} else if (result == "tie"){
		winnerDiv.innerHTML = "Tie!";
	}
	// currentPlayer = human;
}

function equals3(a, b, c){
	// console.log(a,b,c)
	return a == b && b == c && a != "";
}

function checkWinner(){
	let board = getBoard()
	let winner = null;
	for(let i = 0; i < 3; i++){
		if(equals3(board[i][0].innerHTML, board[i][1].innerHTML, board[i][2].innerHTML)){
			winner = board[i][0].innerHTML;
		}
		if(equals3(board[0][i].innerHTML, board[1][i].innerHTML, board[2][i].innerHTML)){
			winner = board[0][i].innerHTML;
		}
		if(equals3(board[0][0].innerHTML, board[1][1].innerHTML, board[2][2].innerHTML)){
			winner = board[0][0].innerHTML;
		}
		if(equals3(board[0][2].innerHTML, board[1][1].innerHTML, board[2][0].innerHTML)){
			winner = board[0][2].innerHTML;
		}
	}

	let openSpots = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++){
			if(board[i][j].innerHTML == ''){
				openSpots++;
			}
		}
	}

	if(winner == null && openSpots == 0){
		return 'tie';
	} else {
		// console.log(winner)
		return winner;
	}
}

let scores = {
	"X": 1,
	"O": -1,
	"tie": 0
};

function minimax(board, depth, MaximizingPlayer){
	// let board = getBoard()
	let result = checkWinner();
	if(result != null){
		return scores[result];
	}
	if(MaximizingPlayer == true){
		
		let bestScore = -Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++){
					if(board[i][j].innerHTML == ''){
						board[i][j].innerHTML = ai;
						let score = minimax(board, depth++, false);
						board[i][j].innerHTML = '';

						if(score > bestScore){
							bestScore = score;
						}
					}
				}
			} 
		return bestScore
	}
	else{
		let bestScore = Infinity;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				if(board[i][j].innerHTML == ''){
					board[i][j].innerHTML = human;
					let score = minimax(board, depth++, true);
					board[i][j].innerHTML = '';

					if(score < bestScore){
						bestScore = score;
					}
				}
			}
		} 
		return bestScore
	}
	
}


