const container = document.querySelector('.container');
const resetButton = document.getElementById('resetButton');
const cells = container.querySelectorAll('.cell');
const cell = container.querySelector('.cell');

let statusGame = false;
let playerOne, playerTwo;

const newGame = () => {
    cells.forEach(element => element.textContent = '');
    statusGame = false;
}

resetButton.addEventListener("click",newGame);

const playing = () => {
    statusGame = true;
}

const printCell = (e) => {
    console.log(e.target);
    e.target.textContent ='0';
}

for (let cell in cells)  {
    cells[cell].addEventListener("click",(e) => printCell(e));
}





