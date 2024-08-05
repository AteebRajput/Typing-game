//=====================================================================
//                  DOM Elements
//=====================================================================
const startBtn = document.getElementById("start");
const radioBtn = document.querySelectorAll('input[type="radio"]');
const infoLevel = document.getElementById("info-level");
const infoTime = document.getElementById("info-time");
const infoBonus = document.getElementById("info-bonus");
const infoBonusTime = document.getElementById("info-bonus-time");
const mainMenu = document.getElementById("main");
const gameSetLevel = document.getElementById("game-level");
const gameSetTime = document.getElementById("game-time");
const gameSetScore = document.getElementById("game-score");
const shownWord = document.getElementById("shown-word");
const userWord = document.getElementById("user-typed-word");
const resultLevel = document.getElementById("result-level");
const resultScore = document.getElementById("result-score");
const homeBtn = document.getElementById("result-btn");
console.log(homeBtn.classList);

//=====================================================================
//                  Required Variables
//=====================================================================

const rules = {
  easy: {
    time: 15,
    bonus: 5,
    bonusTime: 5,
  },
  medium: {
    time: 10,
    bonus: 3,
    bonusTime: 4,
  },
  hard: {
    time: 6,
    bonus: 1,
    bonusTime: 3,
  },
};

let difficulty = "easy";
let gameTime = rules[difficulty].time;
let gameBonus = rules[difficulty].bonus;
let bonusTime = 5;
let gameScore = 0;
let gameStarted = null;
let gameWord = null;

const words = [
  "acquiesce",
  "belligerent",
  "circumlocution",
  "deleterious",
  "egregious",
  "facetious",
  "gregarious",
  "harangue",
  "idiosyncratic",
  "juxtaposition",
  "kaleidoscope",
  "laconic",
  "magnanimous",
  "nefarious",
  "obfuscate",
  "palimpsest",
  "quixotic",
  "recalcitrant",
  "sagacious",
  "tantamount",
  "ubiquitous",
  "vexatious",
  "whimsical",
  "xenophobia",
  "yammering",
  "zephyr",
  "aberration",
  "blasphemous",
  "cogent",
  "dilatory",
  "equivocate",
  "fallacious",
  "garrulous",
  "histrionic",
  "impecunious",
  "juxtapose",
  "lackadaisical",
  "mendacious",
  "nadir",
  "obstreperous",
  "pellucid",
  "quandary",
  "recidivist",
  "salubrious",
  "taciturn",
  "unctuous",
  "verisimilitude",
  "wanton",
  "xenial",
  "yawning",
  "zealous",
  "abstruse",
  "bellicose",
  "circuitous",
  "dissonant",
  "effervescent",
  "fatuous",
  "grandiloquent",
  "heterogeneous",
  "impecunious",
  "jejune",
  "kismet",
  "lachrymose",
  "munificent",
  "nonplussed",
  "obsequious",
  "perspicacious",
  "quintessential",
  "refractory",
  "solipsistic",
  "trenchant",
  "unconscionable",
  "vicarious",
  "winsome",
  "xanthic",
  "yearning",
  "zealot",
  "axiomatic",
  "bifurcate",
  "cacophony",
  "deleterious",
  "esoteric",
  "forbearance",
  "gossamer",
  "hubris",
  "incipient",
  "jocund",
  "kaleidoscopic",
  "languid",
  "maudlin",
  "neophyte",
  "obdurate",
  "paucity",
  "quiescent",
  "recondite",
  "sycophant",
  "turgid",
  "unfathomable",
  "vestige",
  "welter",
  "xylophone",
  "yoke",
  "zephyr",
];

//=====================================================================
//                  All Functions
//=====================================================================

const homeSetup = (value) => {
  if (value === "medium") {
    difficulty = "medium";
  } else if (value === "hard") {
    difficulty = "hard";
  } else {
    difficulty = "easy";
  }
  gameTime = rules[difficulty].time;
  gameBonus = rules[difficulty].bonus;
  bonusTime = rules[difficulty].bonusTime;
  infoLevel.innerText =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  infoBonus.innerText = `+${gameBonus}`;
  infoTime.innerText = `${gameTime}s`;
  infoBonusTime.innerText = `${bonusTime}s`;
};

const randomWordGenerator = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  gameWord = words[randomIndex];
  shownWord.innerText = gameWord;
  userWord.focus()
};

// Function to ger random word
// const randomWordGenerator = async () => {
//   const url = 'https://free-random-word-generator-api.p.rapidapi.com/random-word';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'd237b1180bmshebac9d385083ecbp18c0f9jsnffb47734e5fa',
// 		'x-rapidapi-host': 'free-random-word-generator-api.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	gameWord = result;
//   shownWord.innerText = gameWord

// } catch (error) {
// 	console.error(error);
// }
// }

// Function to update game screen
const updateGameDOM = () => {
  gameSetLevel.innerText =
  difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  gameSetTime.innerText = `${gameTime}s`;

  setTimeout(startGame(), 1000);
};

// function to start timer

const updateTimer = () => {
  gameSetTime.textContent = gameTime;
};

// Function to start game
const startGame = () => {
  gameStarted = true;
  randomWordGenerator();

  let timeInterval = setInterval(() => {
    gameTime--;
    updateTimer();
    if (gameTime <= 0) {
      clearInterval(timeInterval);
      gameStarted = false;
      alert("Times up");
      resultScreenDOM();
    }
  }, 1000);

  userWord.addEventListener("input", (e) => {
    if (gameStarted) {
      if (e.target.value.length > 0) {
        if (e.target.value.toLowerCase() === gameWord.toLowerCase()) {
          e.target.value = "";
          randomWordGenerator();
          gameTime += bonusTime;
          updateTimer();
          gameScore += gameBonus;
          gameSetScore.textContent = gameScore;
        }
      }
    }
  });
};

const resultScreenDOM = () => {
  mainMenu.className = "result";
  resultLevel.innerText =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  resultScore.innerText = gameScore;
};

// Function to reset the game
const resetGame = () => {
  
  gameTime = rules[difficulty].time;
  gameBonus = rules[difficulty].bonus;
  bonusTime = rules[difficulty].bonusTime;
  gameScore = 0;
  gameStarted = null;
  gameWord = null;

  infoLevel.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  infoBonus.innerText = `+${gameBonus}`;
  infoTime.innerText = `${gameTime}s`;
  infoBonusTime.innerText = `${bonusTime}s`;
  gameSetScore.innerText = gameScore;
  userWord.value = "";
};

//=====================================================================
//                  All Event Listener
//=====================================================================

// Event Listener for changing homepage on radio button clicked
radioBtn.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    homeSetup(e.target.value);
  });
});

// Event Listener for changing pages from home to game
startBtn.addEventListener("click", (e) => {
  updateGameDOM();
  mainMenu.className = "game";
  userWord.focus()
});

// Event Listener to return to home screen
homeBtn.addEventListener("click", (e) => {
  resetGame()
  mainMenu.className = "home";
});
//=====================================================================
//                  Init
//=====================================================================
randomWordGenerator();
