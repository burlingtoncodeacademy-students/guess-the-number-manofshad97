const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let maxNum = 100
let minNum = 1

async function reverseGame() {
  let randNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
  let inputUser = await ask("I am thinking of a random number between 1 and 100 inclusive. Can you guess what it is? ")
  inputUser = parseInt(inputUser)
  while (inputUser !== randNum) {
    if (inputUser > randNum) {
      console.log("Your number is too high!!")
      inputUser = await ask("Try again: ")
      inputUser = parseInt(inputUser)
    }

    else if (inputUser < randNum) {
      console.log("Your number is too low!!")
      inputUser = await ask("Try again: ")
      inputUser = parseInt(inputUser)
    }
  }

  console.log(`You guessed my number correctly! It's ${randNum}!`)
  process.exit()
}

reverseGame()