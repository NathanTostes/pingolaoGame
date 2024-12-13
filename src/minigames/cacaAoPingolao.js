if (!localStorage.getItem('playerBalance')) {
    localStorage.setItem('playerBalance', 0); 
}

let playerBalance = parseInt(localStorage.getItem('playerBalance'));
const balanceElement = document.getElementById('balance');
balanceElement.textContent = playerBalance;

let gameActive = false;
let pingoloes = [];

function playGame() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (!betAmount || betAmount < 1) {
        document.getElementById('result').innerText = "Insira um valor de aposta válido!";
        return;
    }

    if (betAmount > playerBalance) {
        document.getElementById('result').innerText = "Saldo insuficiente!";
        return;
    }

    playerBalance -= betAmount;
    updateBalance();

    gameActive = true;
    document.getElementById('result').innerText = "Boa sorte!";
    generateGameBoard();
}

function generateGameBoard() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = "";

    pingoloes = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, 8);

    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i, cell));
        gameArea.appendChild(cell);
    }
}

function handleCellClick(index, cell) {
    if (!gameActive || cell.classList.contains('disabled')) return;

    if (pingoloes.includes(index)) {
        cell.classList.add('disabled');
        cell.style.backgroundColor = '#dc3545';
        cell.innerHTML = '<img src="../../public/images/pingolaoRemoveBg.png" width="80px">';
        document.getElementById('result').innerText = "Você encontrou um Pingolão! Fim de jogo.";
        gameActive = false;
        return;
    }

    cell.classList.add('disabled');
    cell.style.backgroundColor = '#0d6efd';
    balance += 2;
    updateBalance();
    document.getElementById('result').innerText = "Continue jogando!";
}

function updateBalance() {
    localStorage.setItem('playerBalance', playerBalance); 
    document.getElementById('balance').innerText = playerBalance;
}
