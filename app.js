/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Initialize the game
var scores, roundScores, activePlayer, gamePlaying;

function init() {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;    
    
    // Hide dice picture
    document.querySelector('.dice').style.display = 'none';
    
    // Reset all scores on UI
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    // Remove winner label
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // Remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    // Remove active indicator
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    // Set first player to player 0
    document.querySelector('.player-0-panel').classList.add('active');    
    
}

init();

// Switch the active player
function nextPlayer() {
    //TERNARY OPERATORS
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none'
}

// Generate random number from 1-6 when ROLL DICE is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
    //1. Roll dice
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2. Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
        
    //3. Update round score IF the rolled number was NOT 1
    if(dice !== 1) {
        // Add score
        roundScore += dice; 
        document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
        // Switch the player
        nextPlayer();        
    }
    
    console.log(dice);
        
    }

});

// Add roundScore to current score when the HOLD button is clicked
document.querySelector('.btn-hold').addEventListener('click',function() {
    if(gamePlaying) {
        //Add the CURRENT score to the active player's GLOBAL score
        scores[activePlayer] += roundScore;
    
        //Update the UI to show the GLOBAL score and change player
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        //Check if player won the game     
        if(scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!' 
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Change player
            nextPlayer();
        }
        
    }
        
});

// Start new game when NEW GAME is clicked
document.querySelector('.btn-new').addEventListener('click', init);