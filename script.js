const gameContainer = document.getElementById('game');

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple'
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let index = 0; index < COLORS.length; index++) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add('card');
		// newDiv.style.backgroundColor = color;
		newDiv.setAttribute('data-xyz', COLORS[index]);
		newDiv.setAttribute('data-index', index);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// state variables
let prevColor = null;
let lastCardClicked = null;
let isFirstClick = true;
let revealedCards = 0;
let score = 0;

function handleCardClick(event) {
	let currentCard = event.target;
	const currentColor = currentCard.getAttribute('data-xyz');

	if (lastCardClicked) {
		prevColor = lastCardClicked.getAttribute('data-xyz');
		if (currentCard.getAttribute('data-index') === lastCardClicked.getAttribute('data-index')) {
			console.log('same card clicked');
			return;
		}
	}
	if (revealedCards < 2) {
		currentCard.style.backgroundColor = currentColor;
		revealedCards++;
	} else {
		return; // ABORT!
	}
	// This is where we find a match
	if (!isFirstClick && lastCardClicked && currentColor === prevColor) {
		console.log('MATCH FOUND!');
		score += 1;

		lastCardClicked.removeEventListener('click', handleCardClick);
		currentCard.removeEventListener('click', handleCardClick);

		if (score === COLORS.length / 2) {
			setTimeout(() => {
				alert(`You have matched all the cards! Your final score: ${score}`);
				window.location.reload();
			}, 200);
		}

		console.log('The score is now: ', score);
		lastCardClicked = null;
		revealedCards = 0;
		isFirstClick = true;
		prevColor = null;
		return;
	}
	// if (currentCard.getAttribute('data-index') === lastCardClicked.getAttribute('data-index')) {
	// 	//
	// }

	// This function should check to see if the revealed cards match and if they do not, it should flip them back over.
	if (!isFirstClick) {
		(function(prev, cur) {
			// during this timeout function, the rest of the code will execute and then will reset to blank
			setTimeout(() => {
				prev.style.backgroundColor = '';
				cur.style.backgroundColor = '';
				// allowClick = true;
				console.log('about to reset revealedCards: ', revealedCards);
				revealedCards = 0;
			}, 1000);
		})(lastCardClicked, currentCard);
		// allowClick = false;

		console.log(isFirstClick, 'is first click');
		console.log(lastCardClicked, 'is the last card clicked');
		console.log(currentCard, 'is the current card clicked');
	}
	lastCardClicked = currentCard;
	console.log('you just clicked', revealedCards, 'cards');
	isFirstClick = !isFirstClick;
}

const restart = document.querySelector('#restart');
restart.addEventListener('click', function() {
	alert('You have restarted the game');
	window.location.reload();
});

// when the DOM loads
createDivsForColors(shuffledColors);
