const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//Initialize a counter for the number of guesses, as well as a max number and min number for the range.
let guessCount = 1
let maxNum = 100
let minNum = 1
//Initialize a random number using binary search with the min and max values.
let randNum = Math.floor((maxNum + minNum) / 2)

//function that asks the user to guess a randomly generated number by the computer.
async function reverseGame() {
  //Initialize a different random number for this specific function. This number is generated randomly from 1-100.
  let randNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
  //Take a guess from the user and parse that value as an integer because it comes in as a string.
  let inputUser = await ask("I am thinking of a random number between 1 and 100 inclusive. Can you guess what it is? ")
  inputUser = parseInt(inputUser)
  //While loop that runs as long as the number guessed by the user is not equal to the actual number
  while (inputUser !== randNum) {
    //If the number guessed by user is greater than the actual number, print that the guess is too high and prompt the user to try again. Because this prompt takes user input again which comes in as a string, it must be parsed again. 
    if (inputUser > randNum) {
      console.log("Your number is too high!!")
      inputUser = await ask("Try again: ")
      inputUser = parseInt(inputUser)
    }
    //Same as the previous comment except vice versa. 
    else if (inputUser < randNum) {
      console.log("Your number is too low!!")
      inputUser = await ask("Try again: ")
      inputUser = parseInt(inputUser)
    }
  }
  //If the number guessed by the user is equal to the actual mumber, print that and then exit the program.
  console.log(`You guessed my number correctly! It's ${randNum}!`)
  process.exit()
}
//Function that contains the code for a guessing game where the computer tries to guess a number the user inputs.
async function start() {
    //Initialize a maximum range to be the number the user inputs. Parse the value and use that max to get a random integer using binary search.
    maxNum = await ask("Choose a max range: ")
    maxNum = parseInt(maxNum)
    randNum = Math.floor((maxNum + minNum) / 2)
    console.log("Choose a number between 1 and that number inclusive")
    //Ask the user to choose a number within that range and then store it in a variable
    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    //Use the randomly generated number from line 47 and ask if that's the user's number.
    let userInput = await ask(`Is your number ${randNum}? Type 'Y' or 'N': `)//<- this user input is refenced again in line 81.
    
    //Function that detects if the user is cheating and ends the program if he or she actually cheats.
    async function rangeFunction() {
      //Ask the user if the random number from line 47 generated is higher or lower than the user's number.
      let rangeInput = await ask("Is your number higher or lower? Please enter 'H' or 'L': ")

      //If the user's number is greater than the random number and the user says that it's lower instead, the user is cheating. The part after the or is the same logic as this but vice versa.
      if (randNum < secretNumber && rangeInput === "L" || randNum > secretNumber && rangeInput === "H") {
        console.log(`I can tell when you're cheating! Goodbye.  `)
        process.exit()


      }
      //If the user isn't cheating and the user's number is higher than the random number, look at all values from the (random number + 1), all the way to the max and find the middle of that range. Return that value.
      else if (rangeInput === 'H') {
        minNum = randNum + 1
        randNum = Math.floor((maxNum + minNum) / 2)
        return randNum;

      }
      //If the user isn't cheating and the user's number is lower than the random number, look at all values from the minimum, all the way to the (random number - 1) and find the middle of that range. Return that value.
      else if (rangeInput === "L") {
        maxNum = randNum - 1
        randNum = Math.floor((maxNum + minNum) / 2)
        return randNum;

      }
    }

    //Loop that stops only when the user inputs "Y" for whether or not the computer guessed the number correctly.
    while (userInput !== "Y") {
      //Increment the guess count through each iteration of the while loop to see how many guesses the computer takes to get the number right
      guessCount += 1
      //Since we are already in this loop, it means the user inputted "N" when asked if the number was guessed correctly. If the user input N, but the guess is actually correct, the user is cheating.
      if (parseInt(secretNumber) === randNum) {
        console.log(`I can tell when you're cheating! Goodbye.  `)
        process.exit()

      }
      
      //Reassign the value of randNum to the return value of the rangeFunction. The value is different depending on whether the user says the number is higher or lower than the computer's randomly generated number.
      randNum = await rangeFunction()
      
      //Ask the user again if the newly generated randNum is equal to the number the user has chosen.
      userInput = await ask(`Is your number ${randNum}? Type 'Y' or 'N': `)

      
    }
    //This is out of the while loop which means the user inputted "Y". If the user said yes but the two numbers are not equal, the user is lying.
    if(parseInt(secretNumber) !== randNum){
      console.log(`I can tell when you're cheating! Goodbye.  `)
        process.exit()

    }
    //If the user inputs Y and is not cheating, print out that number along with the amount of tries it took to guess it.
    console.log(`Your number is ${secretNumber}! I guessed it in ${guessCount} tries!`)
    //Promp the user if they would like to play again, otherwise end the program. 
    let playAgain = await ask("Would you like to play again? Type 'Y' or 'N': ")
    if (playAgain === "Y") {
      start()
    }
    else { 
      console.log("Goodbye!")
      
      process.exit() 
    
    }


  


}
//Function that initially asks the user to choose between the two games and depending on the input, runs the function that begins the selected game. 
async function chooseGame(){
  let userChoice = await ask("Would you rather play a game where you guess my number or a game where you guess mine? \nType '1' for the first option or '2' for the second: ")
  if (userChoice === "1"){
    reverseGame()
  }
  else if(userChoice === "2"){
    start()
  }
}




chooseGame();


















