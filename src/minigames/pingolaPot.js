if (!localStorage.getItem('playerBalance')) {
    localStorage.setItem('playerBalance', 0); 
}

let playerBalance = parseInt(localStorage.getItem('playerBalance'));
document.getElementById('balance').textContent = playerBalance;

const pingolaoImage = '<img src="../../public/images/pingolaoRemoveBg.png">';
const faces = [pingolaoImage, '🍒', '💲', '🍆', '🗿', '🚀'];
const backgroundColor = '#e7dcdc';
const backgroundGradient = 'radial-gradient(circle, rgba(147,84,21,1) 0%, rgba(243,196,55,1) 100%, rgba(255,210,59,1) 100%)';

document.getElementById('slot1').innerHTML = '🍒';
document.getElementById('slot2').innerHTML = '🍒';
document.getElementById('slot3').innerHTML = '🍒';

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

const getRandomFace = () => {
    return faces[Math.floor(Math.random() * faces.length)];
}

const setSlotFaces = () => {
    const slot1 = document.getElementById('slot1');
    slot1.innerHTML = getRandomFace();
    if(slot1.innerHTML === pingolaoImage) {
        slot1.style.background = backgroundGradient;
    } else {
        slot1.style.background = '';
    }
    const slot2 = document.getElementById('slot2');
    slot2.innerHTML = getRandomFace();
    if(slot2.innerHTML === pingolaoImage) {
        slot2.style.background = backgroundGradient;
    } else {
        slot2.style.background = '';
    }
    const slot3 = document.getElementById('slot3');
    slot3.innerHTML = getRandomFace();
    if(slot3.innerHTML === pingolaoImage) {
        slot3.style.background = backgroundGradient;
    } else {
        slot3.style.background = '';
    }
}

const verifyResult = (betValue) => {
    const result = document.getElementById('result');

    const slot1Value = document.getElementById('slot1').innerHTML;
    const slot2Value = document.getElementById('slot2').innerHTML;
    const slot3Value = document.getElementById('slot3').innerHTML;
    
    if(slot1Value === slot2Value && slot2Value === slot3Value) {
        if(slot1Value === pingolaoImage) {
            result.innerHTML = 'Você obteve três pingolões!<br>4x ganhos';
            return betValue * 4;
        }
        result.innerHTML = 'Você obteve três iguais!<br>3x ganhos';
        return betValue * 3;
    }
    if(slot1Value === slot2Value) {
        if(slot1Value === pingolaoImage) {
            result.innerHTML = 'Você encontrou dois pingolões!<br>2x ganhos';
            return betValue * 2;
        }
        result.innerHTML = 'Você encontrou dois iguais!<br>Valor da aposta recuperado';
        return betValue;
    }
    if(slot2Value === slot3Value) {
        if(slot2Value === pingolaoImage) {
            result.innerHTML = 'Você encontrou dois pingolões!<br>2x ganhos';
            return betValue * 2;
        }
        result.innerHTML = 'Você encontrou dois iguais!<br>Valor da aposta recuperado';
        return betValue;
    }
    if(slot1Value === slot3Value) {
        if(slot1Value === pingolaoImage) {
            result.innerHTML = 'Você encontrou dois pingolões!<br>2x ganhos';
            return betValue * 2;
        }
        result.innerHTML = 'Você encontrou dois iguais!<br>Valor da aposta recuperado';
        return betValue;
    }
    result.innerHTML = 'Nenhum igual!<br>Perdeu Tudo';
    return 0;
};

const startJackpot = () => {
    const betValue = parseFloat(document.getElementById('betAmount').value);
    const resultText = document.getElementById('result');

    if(!betValue || betValue <= 0) {
        resultText.innerHTML = 'Insira valores validos para iniciar uma aposta!'
        return;
    }
    if(betValue > playerBalance) {
        resultText.innerHTML = 'Saldo insuficiente!'
        return;
    }

    resultText.innerHTML = '';

    playerBalance -= betValue;
    localStorage.setItem('playerBalance', playerBalance);
    document.getElementById('balance').innerText = playerBalance;
    document.getElementById('bet').disabled = true;

    const interval = setInterval(setSlotFaces, 80);
    
    delay(1500).then(() => {
        clearInterval(interval);
        const result = verifyResult(betValue);
        playerBalance += result;
        localStorage.setItem('playerBalance', playerBalance);
        document.getElementById('balance').innerText = playerBalance;
        document.getElementById('bet').disabled = false;
    });
}