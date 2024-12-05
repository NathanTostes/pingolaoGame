window.onload = function() {
    const playerName = localStorage.getItem('playerName');
    const playerBalance = localStorage.getItem('playerBalance');

    document.getElementById('nomeJogador').textContent = playerName ? playerName : "Jogador";
    document.getElementById('saldoJogador').textContent = playerBalance ? `${playerBalance} R$` : "0,00 R$";
}

function abrirModal() {
    document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

function realizarTransacao() {
    const operacao = document.getElementById('operacao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    let saldoAtual = parseFloat(localStorage.getItem('playerBalance'));

    if (operacao === 'depositar') {
        saldoAtual += valor;
        alert(`Você depositou R$ ${valor.toFixed(2)}.`);
    } else if (operacao === 'sacar') {
        if (saldoAtual >= valor) {
            saldoAtual -= valor;
            alert(`Você sacou R$ ${valor.toFixed(2)}.`);
        } else {
            alert("Saldo insuficiente.");
        }
    }

    localStorage.setItem('playerBalance', saldoAtual.toFixed(2));
    document.getElementById('saldoJogador').textContent = `R$ ${saldoAtual.toFixed(2)}`;

    fecharModal();
}