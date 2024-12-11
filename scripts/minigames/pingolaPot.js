const diceEmojis = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
let suspenseInterval;

if (!localStorage.getItem('playerBalance')) {
    localStorage.setItem('playerBalance', 0); 
}

let playerBalance = parseInt(localStorage.getItem('playerBalance'));
const balanceElement = document.getElementById('balance');
balanceElement.textContent = playerBalance;

function playGame() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const guessNumber = parseInt(document.getElementById('guessNumber').value);
    const resultElement = document.getElementById('result');
    const diceElement = document.getElementById('dice');
    const suspenseNumberElement = document.getElementById('suspenseNumber');

    // Validações   
    if (isNaN(betAmount) || isNaN(guessNumber)) {
        resultElement.textContent = 'Por favor, insira valores válidos.';
        return;
    }

    if (betAmount > playerBalance) {
        resultElement.textContent = 'Saldo insuficiente.';
        return;
    }

    if (guessNumber < 1 || guessNumber > 6) {
        resultElement.textContent = 'Escolha um número entre 1 e 6.';
        return;
    }

    diceElement.classList.add('dice-rolling');
    resultElement.textContent = 'Rolando o dado...';

    suspenseInterval = setInterval(() => {
        suspenseNumberElement.textContent = Math.floor(Math.random() * 6) + 1;
    }, 50);

    setTimeout(() => {
        clearInterval(suspenseInterval);

        const diceRoll = Math.floor(Math.random() * 6) + 1;
        diceElement.textContent = diceEmojis[diceRoll];
        suspenseNumberElement.textContent = diceRoll;
        diceElement.classList.remove('dice-rolling');

        if (diceRoll === guessNumber) {
            playerBalance += betAmount * 2;
            resultElement.textContent = `Parabéns! Você ganhou €${betAmount * 2}. O dado rolou ${diceRoll}.`;
        } else {
            playerBalance -= betAmount;
            resultElement.textContent = `Você perdeu €${betAmount}. O dado rolou ${diceRoll}.`;
        }

        localStorage.setItem('playerBalance', playerBalance);
        balanceElement.textContent = playerBalance;

        if (playerBalance <= 0) {
            resultElement.textContent += ' Game Over! Seu saldo acabou.';
            document.querySelector('button').disabled = true;
        }
    }, 1000);
}
