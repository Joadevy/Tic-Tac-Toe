const container = document.querySelector('.container');
const resetButton = document.getElementById('resetButton');
const cells = container.querySelectorAll('.cell');
const result = document.querySelector(".result");

let turn;
let gameStatus = false;
let playsCounter = 0;
const WINNING_PLAYS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const newGame = () => {
    cells.forEach(element => element.textContent = '');
    turn = selectFirstPlayer();
    gameStatus = true;
    result.textContent = '';
    playsCounter = 0;
}

const initializeTable = () => {
    for (let cell=0;cell<9;cell++)  {
        cells[cell].addEventListener("click",(e) => printCell(e));
    }
}

const printCell = (e) => {
    // Asks for the actual player turn
    turn = changeTurn(turn);
    // function (muestraTurnoEnPantalla) >>>> Que muestre un cartelito de que jugador va proximo.
    // Displays the symbol acordding to the turn-player and if the cell is empty.
    if((turn == 0)&&(e.target.textContent === '')&&(gameStatus == true)) {
        e.target.textContent ='O';
        playsCounter++;
    } else if ((turn == 1)&&(e.target.textContent === '')&&(gameStatus ==true)){
        e.target.textContent ='X';
        playsCounter++;
    }
    checkForWinner();
}

const checkForWinner = () => {
    if (playsCounter >=5 && playsCounter <=9) { // Start to check only if there are minimum 5 moves on the table.
        for (let play in WINNING_PLAYS) {
            if (
            (cells[WINNING_PLAYS[play][0]].textContent == 'X')&&
            (cells[WINNING_PLAYS[play][1]].textContent == 'X')&&
            (cells[WINNING_PLAYS[play][2]].textContent == 'X')){
                        gameStatus = false;
                        result.textContent = 'GANO X';
             } else if (
             (cells[WINNING_PLAYS[play][0]].textContent == 'O')&&
             (cells[WINNING_PLAYS[play][1]].textContent == 'O')&&
             (cells[WINNING_PLAYS[play][2]].textContent == 'O')){
                        gameStatus = false;
                        result.textContent =  'GANO O';
             } else if ((playsCounter == 9) && (gameStatus == true)) { // If there are 9 moves on the table and game hasn't ended yet, it's a draw.
                        result.textContent =  'DRAW';
                        gameStatus = false;
            }
        }
    }
}

// Selects a random number between 0/1 to define the first player.
const selectFirstPlayer = () => {
    return playerRandom = Math.round(Math.random());
}

const changeTurn = (previousPlayer) => {
    if (previousPlayer == 0){
        return 1;
    } else if (previousPlayer == 1){
        return 0;
    }
}

const ticTacToe = () => {
    newGame();
    initializeTable();
}

ticTacToe();
resetButton.addEventListener("click",newGame);
