const container = document.querySelector('.container');
const resetButton = document.getElementById('resetButton');
const cells = container.querySelectorAll('.cell');

let turn;

const newGame = () => {
    cells.forEach(element => element.textContent = '');
    turn = selectFirstPlayer();
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
    if((turn == 0)&&(e.target.textContent === '')) {
        e.target.textContent ='O';
    } else if ((turn == 1)&&(e.target.textContent === '')){
        e.target.textContent ='X';
    }
}


/* const isPlaying = () => {
    let playing = false;
    // Asks if the game hasn't started yet.
    cells.forEach
    (cell => { if(cell.textContent != ''){
                    return playing = true;
                }
            });
    return playing;
} */

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







