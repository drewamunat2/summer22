//client

//document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  //const socket = io(); // automatically tries to connect on same port app was served from
  const form = document.getElementById("guess");
  const answers = document.getElementById("all-answers");
  const categories = document.getElementById("categories");
  const input = document.getElementById("charName");
  const dataList = document.getElementById("character-list");

  //makes submission of a guess only possible if an option is clicked on
  let keypress = false;
  input.addEventListener("keydown", (e) => {
      if(e.key) {
          console.log("keydown triggered by keyboard");
          keypress = true;
      }
  });
  input.addEventListener('input', (e) => {
      let guess = e.target.value;
      if (keypress === false) {
        console.log("event input triggered by selecting an option");
        console.log("Value: " + guess);
      }
      keypress = false;
  });



  //all messages reveceived from server
  /*socket.on("message", (msg) => {
    let type = msg.type;
    switch(type) {
      //on input
      case "guess":

        //name guessed
        const name = document.createElement("li");
        name.className = "name-guess";

        //the guess and its response attributes
        const guess = document.createElement("li");
        const gender = document.createElement("span");
        const show = document.createElement("span");
        const genre = document.createElement("span");
        const creator = document.createElement("span");
        const platform = document.createElement("span");
        const year = document.createElement("span");

        //setting each category from msg
        gender.innerText = `${msg.gender}`;
        show.innerText = `${msg.show}`;
        genre.innerText = `${msg.genre}`;
        creator.innerText = `${msg.creator}`;
        platform.innerText = `${msg.platform}`;
        year.innerText = `${msg.year}`;

        //add each category to the answer box
        guess.appendChild(gender);
        guess.appendChild(show);
        guess.appendChild(genre);
        guess.appendChild(creator);
        guess.appendChild(platform);
        guess.appendChild(year);
        guess.className = "answer";

        //add name and answer box to all answers
        answers.appendChild(name);
        answers.appendChild(guess);
        answers.scrollTop = answers.scrollHeight;
        break;
      //Welcome message to user joining the chat
      default:
        console.log("on message: error");
        break;
    }
  });
//});*/