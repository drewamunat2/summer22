//game script

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


//batman
charMap.set(
  'Batman', 
  ['male', 'Batman', 'Superhero', 'Bob Kane', 'DC Comics', '1939']
);

//superman
charMap.set(
  'Superman', 
  ['male', 'Superman', 'Superhero', 'Christopher Nolan', 'DC Comics', '1933']
);

const form = document.getElementById("guess");
const answers = document.getElementById("all-answers");
const categories = document.getElementById("categories");
const input = document.getElementById("charName");
const dataList = document.getElementById("character-list");
const numGuessesDisplay = document.getElementById("num-guesses");

//makes submission of a guess only possible if an option is clicked on
let keypress = false;
input.addEventListener("keydown", (e) => {
    if(e.key) {
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
        /*gender: charMap[name][0],
        show: charMap[name][1],
        genre: charMap[name][2],
        creator: charMap[name][3],
        platform: charMap[name][4],
        year: charMap[name][5]*/

        gender: 'male',
        show: 'Superman',
        genre: 'Superhero',
        creator: 'Christopher Nolan',
        platform: 'DC Comics',
        year: '1933'
      }
      result(guess);
      input.value = "";
      numGuessesDisplay.innerText = `${answers.getElementsByClassName("answer-li").length} of 8 guesses`;
    }
    keypress = false;
});

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