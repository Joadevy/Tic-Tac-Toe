const container = document.querySelector('.container');
const resetButton = document.getElementById('resetButton');
const cells = container.querySelectorAll('.cell');

let statusGame = false;
let playerOne, playerTwo;

const newGame = () => {
    cells.forEach(element => element.textContent = '');
    statusGame = false;
}

resetButton.addEventListener("click",newGame);

const printCell = (e) => {
    console.log(e.target);
    e.target.textContent ='0';
}

const playing = () => {
    statusGame = true;
    for (let cell=0;cell<9;cell++)  {
        cells[cell].addEventListener("click",(e) => printCell(e));
    }
}



const setTurn = () => {
    let empty = true;
    // Asks if the game hasn't started yet.
    cells.forEach
    (cell => { if(cell.textContent != ''){
                    return empty = false;
                }
            });

    // If the game hasn't started, select first player symbol.
    if(empty === true) {
        selectFirstPlayer();
    // If the game has started, changes the turn to the other player.
    } else if(empty === false){
        changeTurn();
    }
}

const changeTurn = () => {
    
}

playing();
setTurn();







