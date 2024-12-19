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
        balance = 0; 
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

    multiplier = 0;
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


    if (winnings != 0) {
        document.getElementById('final-multiplier').innerHTML = `Resultado: ${multiplier.toFixed(2)} x`
        document.getElementById('winnings').innerHTML = `Ganhos: R$ ${winnings.toFixed(2)}`
        document.getElementById('balance').innerHTML = balance.toFixed(2);
    }else{
        let text1 = document.getElementById('final-multiplier')
        let text2 = document.getElementById('winnings')
        text1.style.fontSize = '30px'
        text1.innerHTML = 'Essa não!!'
        text2.innerHTML = 'Você perdeu tudo!'
    }

}

function resetGame() {
    document.getElementById('betting-screen').style.display = 'block';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('bet-amount').value = '';
           
    var crashSquare = document.getElementById('crash-square');
    // crashSquare.style.width = '10px';
    crashSquare.style.height = '10px';
}

function updateDisplay() {
    var crashSquare = document.getElementById('crash-square');
    // crashSquare.style.width = gameSize + 'px';
    crashSquare.style.height = gameSize + 'px';
    document.getElementById('multiplier').textContent = multiplier.toFixed(2) + 'x';
}

initializeBalance()