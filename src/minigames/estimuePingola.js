var balance = 1000;
var betAmount = 0;
var multiplier = 0;
var gameInterval;
var gameSize = 10;
var crashPoint;

function initializeBalance() {
    const savedBalance = localStorage.getItem('playerBalance');
    if (savedBalance) {
        balance = Number(savedBalance);
    } else {
        balance = 0; //
        localStorage.setItem('playerBalance', balance);
    }
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function updateBalance() {
    localStorage.setItem('playerBalance', balance);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function startGame() {
    betAmount = Number(document.getElementById('bet-amount').value);
            
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Por favor, insira um valor de aposta válido');
        return;
    }

    if (betAmount > balance) {
        alert('Saldo insuficiente');
        return;
    }

    balance -= betAmount;
    document.getElementById('balance').textContent = balance.toFixed(2);
            
    document.getElementById('betting-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('result-screen').style.display = 'none';

    multiplier = 1;
    gameSize = 10;
            
    crashPoint = Number((Math.random() * 5).toFixed(2));
            
    updateDisplay();

    gameInterval = setInterval(function() {
        multiplier = Number((multiplier + 0.1).toFixed(2));
        gameSize += 5;

        updateDisplay();

        if (multiplier >= crashPoint) {
            clearInterval(gameInterval);
            endGame(0);
        }
    }, 100);
}

function cashOut() {
    clearInterval(gameInterval);
    let winnings = betAmount * multiplier;

    endGame(winnings);
}

function endGame(winnings) {
    
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    balance += winnings;

    updateBalance()

    document.getElementById('final-multiplier').textContent = multiplier.toFixed(2);
    document.getElementById('winnings').textContent = winnings.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function resetGame() {
    document.getElementById('betting-screen').style.display = 'block';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('bet-amount').value = '';
           
    var crashSquare = document.getElementById('crash-square');
    crashSquare.style.width = '10px';
    crashSquare.style.height = '10px';
}

function updateDisplay() {
    var crashSquare = document.getElementById('crash-square');
    crashSquare.style.width = gameSize + 'px';
    crashSquare.style.height = gameSize + 'px';
    document.getElementById('multiplier').textContent = multiplier.toFixed(2) + 'x';
}

initializeBalance()