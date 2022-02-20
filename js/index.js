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

let animation = bodymovin.loadAnimation({
    container: document.getElementById('anim'),
    renderer: 'svg',
    autoplay: true,
    loop: true,
    path: 'assets/animation/snowfall.json'
})
let turn;
let gameStatus = false;
let playsCounter = 0; // Tracks the movement number of both players.
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

// Calls the functions to start a new game
const newGame = () => {
    resetGame();
    removeModalButtons ();
    showFirstPlayer();
}

// Puts the cells empty, selects the first player move and resets the move counter to zero.
const resetGame = () => {
    cells.forEach(element => element.textContent = '');
    turn = selectFirstPlayer();
    gameStatus = true;
    playsCounter = 0;
}

// Selects a random number between 0/1 to define the first player.
const selectFirstPlayer = () => {
    return playerRandom = Math.round(Math.random());
}

// If there are buttons in the modal window, removes it for avoid duplicate buttons (probably this is not the best practice)
const removeModalButtons = () => {
    if (modalButtons.hasChildNodes() == true) {
        let button = document.querySelectorAll('.resetButton');
        modalButtons.removeChild(button[0]);
        modalButtons.removeChild(button[1]);
        removeModal();
    } 
}

// Removes the modal window after 500ms to execute the animation correctly.
const removeModal = () => {
    modal.classList.toggle("modal-close");
    setTimeout(()=>{
        modalContainer.style.opacity = "0";
        modalContainer.style.visibility = "hidden";
    },500);
}

closeModal.addEventListener('click',removeModal);

// Displays the first player's information before the first move of the game.
const showFirstPlayer = () => {
    if (turn != 0) {
        showFirstTurn.textContent= `First player: O`;
        showFirstTurn.style.color = "darkolivegreen";
    } else {
        showFirstTurn.textContent = `First player: X`;
        showFirstTurn.style.color = "darksalmon";
    } 
}

// Adds the listener for each cell defining the printAndCheck to the event.
const playing = () => {
    for (let cell=0;cell<9;cell++)  {
        cells[cell].addEventListener("click",(e) => printAndCheck(e));
    }
}

// Calls the functions to removes the alert after the first move, print the movements, check and show the game-result and update the scoreboard.
const printAndCheck= (e) => {
    removeFirstTurnAlert();
    print(e);
    showResult(checkForWinner());
    updateGlobalScore(gameStatus);
}

// Removes the alert of first move.
const removeFirstTurnAlert = () => {
    showFirstTurn.textContent= ``;
} 

// Changes the turn and prints the movement of the player after the click.
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

// Changes the player turn.
const changeTurn = (previousPlayer) => {
    if (previousPlayer == 0){
        return 1;
    } else if (previousPlayer == 1){
        return 0;
    }
}

// After the 5 movement, begins to check if there has been a winner. Uses the established WINNING_PLAYS for compare.
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

// Uses the result of checkForWinner to add the winner into the modal window and calls the play again function.
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
        gameStatus = false;
        result.textContent =  'DRAW';
        playAgain();
    }
}

// Calls the functions to show the buttons in the modal window and opens it.
const playAgain = () => {
    showPlayAgainButton();
    showResetScoreButton();
    openModal();
}

// Displays the play again button in the modal window and adds the listener to reset the game so as to play again.
showPlayAgainButton = () => {
    const button = document.createElement("BUTTON");
    button.textContent = "Play again";
    button.classList.add('resetButton');
    modalButtons.appendChild(button);
    button.addEventListener("click",newGame);
}

//Displays the reset scoreboard button in the modal window and adds the listener to reset the wins counter of both players and update the global score (0-0).
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

// Updates the scoreboard.
const updateGlobalScore = (gameStatus) => {
    if (gameStatus == false) {
        scoreX.innerHTML = `Player X: <b>${winsCounterX}</b>`;
        scoreO.innerHTML = `Player O: <b>${winsCounterO}</b>`;
    }
}

// Makes the modal window visible.
const openModal = () => {
    modalContainer.style.opacity = "1";
    modalContainer.style.visibility = "visible";
    modal.classList.toggle("modal-close");
}

// Calls the functions to start a game.
const ticTacToe = () => {
    newGame();
    playing();
}

ticTacToe();
