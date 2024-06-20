let players = [];
let attempts = 0;

document.getElementById('start-form').addEventListener('submit', startGame);
document.getElementById('guess-form').addEventListener('submit', function(event) {
    event.preventDefault();
    checkGuess();
});
document.getElementById('play-again-button').addEventListener('click', playAgain);
document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('clear-leaderboard-button').addEventListener('click', clearLeaderboard);

function startGame(event) {
    event.preventDefault();
    let playerName = document.getElementById('playerName').value;
    if (playerName.trim() === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    document.getElementById('welcomeMessage').innerText = `Olá, ${playerName}! Adivinhe o número entre 1 e 100:`;
    document.getElementById('start-form').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    targetNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    let guessInput = document.getElementById('guessInput').value;
    let guess = parseInt(guessInput);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Por favor, insira um número válido entre 1 e 100.');
        return;
    }

    {

    document.getElementById('guessInput').value = ''; // Limpa o campo de palpite após cada tentativa

    }

    attempts++
    if (guess === targetNumber) {
        document.getElementById('feedback').innerText = '';
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        let playerName = document.getElementById('playerName').value;
        document.getElementById('congratsMessage').innerText = `Parabéns, ${playerName}! Você acertou o número em ${attempts} tentativas.`;
        document.getElementById('correctNumber').innerText = targetNumber;
        document.getElementById('score').innerText = attempts;
        savePlayer(playerName, attempts);
        updateLeaderboard();
    } else if (guess < targetNumber) {
        console.log(targetNumber);
        let diferenca = targetNumber - guess;
        if (diferenca <= 10) {
            document.getElementById('feedback').innerText = 'O número é maior. Tente novamente!';
            document.getElementById('feedback').style.color = '#32CD32'; // Verde
        } else if (diferenca > 10 && diferenca <= 20) {
            document.getElementById('feedback').innerText = 'O número é maior. Tente novamente!';
            document.getElementById('feedback').style.color = '#FFFF00'; // Amarelo
        } else {
            document.getElementById('feedback').innerText = 'O número é maior. Tente novamente!';
            document.getElementById('feedback').style.color = '#FF0000'; // Vermelho
        }
    } else if (guess > targetNumber) {
        console.log(targetNumber);
        let diferenca = guess - targetNumber;
        if (diferenca <= 10) {
            document.getElementById('feedback').innerText = 'O número é menor. Tente novamente!';
            document.getElementById('feedback').style.color = '#32CD32'; // Verde
        } else if (diferenca > 10 && diferenca <= 20) {
            document.getElementById('feedback').innerText = 'O número é menor. Tente novamente!';
            document.getElementById('feedback').style.color = '#FFFF00'; // Amarelo
        } else {
            document.getElementById('feedback').innerText = 'O número é menor. Tente novamente!';
            document.getElementById('feedback').style.color = '#FF0000'; // Vermelho
        }
    }
    
}
function savePlayer(name, score) {
    players.push({ name, score });
    players.sort((a, b) => a.score - b.score); // Ordena do menor para o maior número de tentativas
    localStorage.setItem('players', JSON.stringify(players));
}

function loadPlayers() {
    let playersData = localStorage.getItem('players');
    if (playersData) {
        players = JSON.parse(playersData);
    }
}

function updateLeaderboard() {
    loadPlayers();
    let leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';
    players.forEach((player, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<span>${index + 1}.</span> ${player.name} - ${player.score} tentativas`;
        leaderboardElement.appendChild(listItem);
    });
}

function playAgain() {
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    targetNumber = Math.floor(Math.random() * 100) + 1;
}

function restartGame() {
    attempts = 0;
    document.getElementById('playerName').value = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('start-form').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    updateLeaderboard();
}

function clearLeaderboard() {
    localStorage.removeItem('players');
    players = [];
    updateLeaderboard();
}

// Atualiza a classificação ao carregar a página
updateLeaderboard();
