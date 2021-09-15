//Initial Dates
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let turn = '';
let warning = '';
let playing = false;

reset()

//Events
let resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
});



//Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (turn && square[item] === '') {
        square[item] = turn;
        renderSquare();
        togglePlayer();
    }
}


function reset() {
    warning = '';
    
    let random = Math.floor(Math.random()*2);
    turn = (random === 0) ? '❌' : '⭕';

    for(let i in square) {
        square[i] = '';
    }
    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);

        if(square[i] !== '') {
            item.innerHTML = square[i]
        } else {
            item.innerHTML = '';
        }

        checkGame()
    }
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
     if(turn === '❌') {
         turn = '⭕'
     } else {
         turn = '❌'
     }
     renderInfo()
}

function checkGame() {
    if(checkWinnerFor('❌')) {
        warning = ' "❌" won the game';
        playing = false;
    }else if(checkWinnerFor('⭕')) {
        warning = ' "⭕" won the game';
        playing = false;
    }else if (filledSquare()) {
        warning = 'Nonscoring';
        playing = false
    }
}


function checkWinnerFor(turn) {
    let possibilities = [
        //Horizontal
        'a1','a2','a3',
        'b1','b2','b3',
        'c1','c2','c3',

        //Vertical
        'a1','b1','c1',
        'a2','b2','c2',
        'a3','b3','c3',

        //Transversal
        'a1','b2','c3',
        'a3','b2','c1'
    ]
    for(let w in possibilities) {
        let pArrey = possibilities[w].split(','); // Arrey com a1, a2, a3 ...
        let hasWon = pArrey.every(option => square[option] === turn);
        if(hasWon) {
            return true
        }

        return false
    }
}

function filledSquare() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true
}

//Basicamente, nosso jogo já está funcionanado, agora precisamos criar os eventos de click nas áreas; para isso há duas opções

//a 1ª podemos selecionar cada um e roda uma função;
//2ª percorrer todos os elementos e roda uma função;

// Exemplos:


/*
    [Opção A]

    document.querySelector('div[data-item=a1]').addEventListener('click' itemClick);
document.querySelector('div[data-item=a2]').addEventListener('click' itemClick);
document.querySelector('div[data-item=a3]').addEventListener('click' itemClick);




//Functions
function itemClick() {

}




    [Opção B]


*/





//ForEach => Percorre os elementos