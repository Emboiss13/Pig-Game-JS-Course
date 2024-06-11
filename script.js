'use strict';

// Selecting elements & creating repeat variables

// Player related elements
const player0El = document.querySelector('.player--0'); 
const player1El = document.querySelector('.player--1'); 
const score0El = document.getElementById('score--0'); 
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Dice related elements
const diceEl = document.querySelector('.dice'); 
const btnNew = document.querySelector('.btn--new'); 
const btnRoll = document.querySelector('.btn--roll'); 
const btnHold = document.querySelector('.btn--hold');

// Declaring variables
let scores, currentScore, activePlayer, playing; 

// Starting conditions
const init = function () {
    // Initialize game state variables
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Reset UI elements to initial state
    diceEl.classList.add('hidden'); 
    score0El.textContent = 0; 
    score1El.textContent = 0;
    current0El.textContent = 0; 
    current1El.textContent = 0;

    // Reset player classes
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

// Switch player function
const playerSwitch = function () {
    // Reset current score for active player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Toggle active player class
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Initialize game
init();

// Rolling Dice logic
btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generate random dice roll
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceRoll}.png`;

        // Check if rolled 1
        if (diceRoll !== 1) {
            // Add dice roll to current score
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            playerSwitch();
        }
    }
});

// Holding Score logic
btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to total score of active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player has won
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            // Switch to next player
            playerSwitch();
        }
    }
});

// Resetting Game logic
btnNew.addEventListener('click', init);
