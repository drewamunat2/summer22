//game script
//import {results} from './connection';

/*const fetchCharacters = async () => {
  const url = 'http://localhost:3001/characters';
  fetch(url)
    .then(res => res.json())
    .then(json => {
      // randomly generate int 0-12
      console.log(json);
      return;
  });
};

document.addEventListener("DOMContentLoaded", (_event) => {
  fetchCharacters();
});*/

//dummy array
const charactersArray = [
  "Batman",
  "Superman",
  "Darth Vader",
  "Bubbles",
  "Goku",
  "Harry Potter",
  "Captain Kirk",
  "Zelda",
  "Skeletor",
  "Mario",
  "Rick O’Connell",
  "Gill-Man",
  "Frank N. Furter"
];

const charMap = new Map(); //characters and their attributes
let numGuesses = 0;

//batman
charMap.set(
  'Batman', 
  ['male', 'Batman', 'Superhero', 'Bob Kane', 'DC Comics', '1939', 'true']
);

//superman
charMap.set(
  'Superman', 
  ['male', 'Superman', 'Superhero', 'Christopher Nolan', 'DC Comics', '1933', 'false']
);

const answers = document.getElementById("all-answers");
const categories = document.getElementById("categories");
const input = document.getElementById("charName");
const dataList = document.getElementById("character-list");
const numGuessesDisplay = document.getElementById("num-guesses");

//makes submission of a guess only possible if an option is clicked on
let keypress = false;
input.addEventListener("keydown", (e) => {
    console.log(e.key);
    if(e.key && (e.key !== "Enter")) {
        console.log("keydown triggered by keyboard");
        keypress = true;
    }
});
input.addEventListener('input', (e) => {
    let name = e.target.value;
    if (keypress === false) {
      console.log("event input triggered by selecting an option");
      console.log("Value: " + name);
      const guess = {
        name: name,
        gender: charMap.get(name)[0],
        show: charMap.get(name)[1],
        genre: charMap.get(name)[2],
        creator: charMap.get(name)[3],
        platform: charMap.get(name)[4],
        year: charMap.get(name)[5],
        win: charMap.get(name)[6]
      }
      result(guess);
      input.value = "";
      numGuesses = assertNumGuesses(answers.getElementsByClassName("answer-li").length, input);
      numGuessesDisplay.innerText = `${numGuesses} of 8 guesses`;
      if(assertWin(guess.win)) {
        alert("CORRECT! YOU WIN!");
      }
      if(numGuesses === 8) {
        alert("OUT OF GUESSES! YOU LOSE!");
      }
    }
    keypress = false;
});

const assertWin = (win) => {
  if (win === 'true') {
    input.disabled = true;
    return true;
  }
  return false;
}

const assertNumGuesses = (numGuesses, input) => {
  if (numGuesses > 7) {
    input.disabled = true;
  }
  return numGuesses;
}

const result = (guess) => {

  console.log(guess);

  //name guessed
  const text = document.createElement("li");
  const title = document.createElement("span");
  title.innerText = `${guess.name}`;
  title.className = "name-guess";
  text.appendChild(title);

  //the guess and its response attributes
  const gender = document.createElement("span");
  const show = document.createElement("span");
  const genre = document.createElement("span");
  const creator = document.createElement("span");
  const platform = document.createElement("span");
  const year = document.createElement("span");

  //setting each category from msg
  gender.innerText = `${guess.gender}`;
  show.innerText = `${guess.show}`;
  genre.innerText = `${guess.genre}`;
  creator.innerText = `${guess.creator}`;
  platform.innerText = `${guess.platform}`;
  year.innerText = `${guess.year}`;

  //add each category to the answer box
  text.appendChild(gender);
  text.appendChild(show);
  text.appendChild(genre);
  text.appendChild(creator);
  text.appendChild(platform);
  text.appendChild(year);
  text.className = "answer-li";

  //add name and answer box to all answers
  answers.appendChild(text);
  answers.scrollTop = answers.scrollHeight;
};