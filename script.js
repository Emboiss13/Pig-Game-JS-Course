'use strict';

// Selecting elements & creating repeat variables

// Player related elements
const player0El = document.querySelector('.player--0'); 
const player1El = document.querySelector('.player--1'); 
const score0El = document.getElementById('score--0'); 
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1')


// Dice related elements
const diceEl = document.querySelector('.dice'); 
const btnNew = document.querySelector('.btn--new'); 
const btnRoll = document.querySelector('.btn--roll'); 
const btnHold = document.querySelector('.btn--hold');

// Declaring variables
let scores, currentScore, activePlayer, playing; 


// Starting conditions
const init = function () {

    // Global Variables for game logic
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0; 

    // This state variable allows us to only execute the game is we are actually 'playing'
    playing = true; 

    // Score conditions
    diceEl.classList.add('hidden'); 
    score0El.textContent = 0; 
    score1El.textContent = 0;
    current0El.textContent = 0; 
    current1El.textContent = 0;

    // Player conditions
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--winner');
    
}


// Switch player function
const playerSwitch = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0;
        
    // Toggle adds a class if it's not there and removes it if it is
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

/*
-------------------------------------------------------------------------------------
SETTING INITIAL CONDITIONS

    • Player 1 score = 0
    • Player 2 score = 0 
    • Dice image is hidden

-------------------------------------------------------------------------------------
*/ 
init();


/*
-------------------------------------------------------------------------------------
LOGIC BREAKDOWN - USER ROLLS A DICE

    1- User rolls a dice (by clicking the roll dice button)
        1.1 - Random dice roll
            → <button class="btn btn--roll">🎲 Roll dice</button>
    2- System displays dice roll
    3- System checks if the roll = 1 : 
        → Yes → Switch player
        → No →
                4 - Add dice to current score
                5 - Display new score

-------------------------------------------------------------------------------------
*/

// 1- Rolling Dice logic
btnRoll.addEventListener('click', function () {

    if (playing) {

        // 1.1- Generate random dice role
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        // 2- Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceRoll}.png`;


        //3- Check if roll = 1
        if (diceRoll !== 1) {
            // Add dice to current score
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
        } else {
            // Switch to next player
            playerSwitch();
        }
    }
        
    

});

/*
-------------------------------------------------------------------------------------
LOGIC BREAKDOWN - USER HOLDS A SCORE

    1- User holds a score
    2- Add current score to total score
    3- System checks if score >= 100: 
        → No → Switch player
        → Yes →
                4- Current player WINS!

-------------------------------------------------------------------------------------
*/

btnHold.addEventListener('click', function () {

    if (playing) {

        //2- Add current score to score of ACTIVE PLAYER
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //3- Check score is > 100
        if (scores[activePlayer] >= 20) {

            //3.2 Finish Game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            
        } else {
            //3.1 Switch to next player
            playerSwitch();
        }
    }
    
})


/*
-------------------------------------------------------------------------------------
LOGIC BREAKDOWN - USER RESETS GAME

    1- User resets game
    2- Set all scores to 0
    3- Set player 1 as starting player

-------------------------------------------------------------------------------------
*/
btnNew.addEventListener('click', init);