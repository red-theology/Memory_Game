// import './styles.css';

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

let lastCardClicked = null;
let isFirstClick = true;
let score = 0;

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked

	let currentCard = event.target;
	const currentColor = currentCard.getAttribute('data-xyz');
	currentCard.style.backgroundColor = currentColor;

	let prevColor;

	if (lastCardClicked) {
		prevColor = lastCardClicked.getAttribute('data-xyz');
	}
	if (
		lastCardClicked &&
		currentColor === prevColor &&
		currentCard.getAttribute('data-index') !== lastCardClicked.getAttribute('data-index')
	) {
		console.log('MATCH FOUND!');
		lastCardClicked = null;
	} else {
		// INCR SCORE
		if (!isFirstClick) {
			(function(prev, cur) {
				setTimeout(() => {
					prev.style.backgroundColor = '';
					cur.style.backgroundColor = '';
				}, 1000);
			})(lastCardClicked, currentCard);
		}
	}
	lastCardClicked = event.target;
	console.log('you just clicked', lastCardClicked);
	isFirstClick = !isFirstClick;
}

// This is what I am trying to figure out. It should loop thru the array like
// the function above, then execute the inner function setColor
// which (in theory) should set the background color every time through the loop.
// I'm not sure why, but it is not executing the way it should and I can't
// seem to figure out what is going wrong

function makeCardColor(colorArray) {
	function setColor(evt) {
		const getDiv = document.getElementById('game');
		getDiv.addEventListener('click', (evt.target.style.backgroundColor = COLORS[color]));
	}
	for (let color of colorArray) {
		return setColor();
	}
}
// function red(evt) {
// 	evt.target.style.backgroundColor = 'red';
// }

// redClick[0].addEventListener('click', red);

// when the DOM loads
createDivsForColors(shuffledColors);
