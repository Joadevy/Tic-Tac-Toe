const container = document.querySelector('.container');
const cells = container.querySelectorAll('.cell');
const result = document.querySelector(".result");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const main = document.querySelector(".main");
const closeModal = document.querySelector('.close');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const modalButtons = document.querySelector('.modal-buttons');
const showFirstTurn = document.querySelector('.firstTurn');

let turn;
let gameStatus = false;
let playsCounter = 0;
let winsCounterX = 0; let winsCounterO = 0; // Counts the amount of wins of each player.
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
    resetGame();
    removeModalButtons ();
    showFirstPlayer();
}

const resetGame = () => {
    cells.forEach(element => element.textContent = '');
    turn = selectFirstPlayer();
    gameStatus = true;
    result.textContent = '';
    playsCounter = 0;
}

// Selects a random number between 0/1 to define the first player.
const selectFirstPlayer = () => {
    return playerRandom = Math.round(Math.random());
}

const removeModalButtons = () => {
    if (modalButtons.hasChildNodes() == true) {
        let button = document.querySelectorAll('.resetButton');
        modalButtons.removeChild(button[0]);
        modalButtons.removeChild(button[1]);
        removeModal();
    } 
}

const removeModal = () => {
    modal.classList.toggle("modal-close");
    setTimeout(()=>{
        modalContainer.style.opacity = "0";
        modalContainer.style.visibility = "hidden";
    },500);
}

closeModal.addEventListener('click',removeModal);

const showFirstPlayer = () => {
    if (turn != 0) {
        showFirstTurn.textContent= `First player: O`;
        showFirstTurn.style.color = "darkolivegreen";
    } else {
        showFirstTurn.textContent = `First player: X`;
        showFirstTurn.style.color = "darksalmon";
    } 
}

const playing = () => {
    for (let cell=0;cell<9;cell++)  {
        cells[cell].addEventListener("click",(e) => printAndCheck(e));
    }
}

const printAndCheck= (e) => {
    removeFirstTurnAlert();
    print(e);
    showResult(checkForWinner());
    updateGlobalScore(gameStatus);
}

const removeFirstTurnAlert = () => {
    showFirstTurn.textContent= ``;
} 

const print = (e) => {
    if (e.target.textContent === '') {
        // Change the actual player turn if the cell is empty
        turn = changeTurn(turn);

        // Displays the symbol acordding to the turn-player and if the cell is empty.
        if((turn == 0)&&(gameStatus == true)) {
            e.target.classList.remove('darksalmon');
            e.target.classList.add('darkolivegreen');
            e.target.textContent ='O';
            playsCounter++;
        } else if ((turn == 1)&&(gameStatus ==true)){
            e.target.classList.remove('darkolivegreen');
            e.target.classList.add('darksalmon');
            e.target.textContent ='X';
            playsCounter++;
        }
    }
}

const changeTurn = (previousPlayer) => {
    if (previousPlayer == 0){
        return 1;
    } else if (previousPlayer == 1){
        return 0;
    }
}

const checkForWinner = () => {
    if (playsCounter >=5 && playsCounter <=9 && gameStatus == true) { // Start to check only if there are minimum 5 moves on the table.
        for (let play in WINNING_PLAYS) {
            if (
            (cells[WINNING_PLAYS[play][0]].textContent == 'X')&&
            (cells[WINNING_PLAYS[play][1]].textContent == 'X')&&
            (cells[WINNING_PLAYS[play][2]].textContent == 'X')){
                        return 'X';
             } else if (
             (cells[WINNING_PLAYS[play][0]].textContent == 'O')&&
             (cells[WINNING_PLAYS[play][1]].textContent == 'O')&&
             (cells[WINNING_PLAYS[play][2]].textContent == 'O')){
                        return ('O');
             } 
        }
    }
    if ((playsCounter == 9) && (gameStatus == true)) { // If there are 9 moves on the table and game hasn't ended yet, it's a draw.
        return 'DRAW';
    }
}

const showResult = (resultOfGame) => {
    if (resultOfGame === 'X') {
        gameStatus = false;
        result.textContent = 'PLAYER X WIN';
        winsCounterX++;
        playAgain();
    } else if (resultOfGame === 'O'){
        gameStatus = false;
        result.textContent =  'PLAYER O WIN';
        winsCounterO++;
        playAgain();
    } else if (resultOfGame === 'DRAW'){
        result.textContent =  'DRAW';
        gameStatus = false;
        playAgain();
    }
}

const playAgain = () => {
    showPlayAgainButton();
    showResetScoreButton();
    openModal();
}

showPlayAgainButton = () => {
    const button = document.createElement("BUTTON");
    button.textContent = "Play again";
    button.classList.add('resetButton');
    modalButtons.appendChild(button);
    button.addEventListener("click",newGame);
}

const showResetScoreButton = () => {
    const button = document.createElement("BUTTON");
    button.textContent = 'Reset scoreboard';
    button.classList.add('resetButton');
    modalButtons.appendChild(button);
    button.addEventListener("click", () => {
        winsCounterX = 0; 
        winsCounterO = 0;
        updateGlobalScore(false);
    })
}

const updateGlobalScore = (gameStatus) => {
    if (gameStatus == false) {
        scoreX.innerHTML = `Player X: <b>${winsCounterX}</b>`;
        scoreO.innerHTML = `Player O: <b>${winsCounterO}</b>`;
    }
}


const openModal = () => {
    modalContainer.style.opacity = "1";
    modalContainer.style.visibility = "visible";
    modal.classList.toggle("modal-close");
}

const ticTacToe = () => {
    newGame();
    playing();
}

ticTacToe();
