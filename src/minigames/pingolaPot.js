if (!localStorage.getItem('playerBalance')) {
    localStorage.setItem('playerBalance', 0); 
}

let playerBalance = parseInt(localStorage.getItem('playerBalance'));
document.getElementById('balance').textContent = playerBalance;

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

const startJackpot = () => {
    document.getElementById('bet').disabled = true;
    
    delay(1000).then(() => document.getElementById('bet').disabled = false);
}