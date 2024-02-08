// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

let oldPoint = [];

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

const bonusPointStructure = {
   1: ['L', 'N', 'R', 'S', 'T', 'D', 'G', 'B', 'C', 'M', 'P', 'F', 'H', 'V', 'W', 'Y', 'K', 'J', 'X', 'Q', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
};

const bonusPointStructureTwo = bonus(bonusPointStructure);

const newPointStructure = transform(oldPointStructure);

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

   word = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return word;
};





function simpleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
       if (word.length[i] === letterPoints[i]) {
         letterPoints += 1;
      }
   }
   return letterPoints;
}


function vowelBonusScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      let key = Object.keys(bonusPointStructureTwo);

      if (key.includes(word[i])) {
            letterPoints += bonusPointStructureTwo[word[i]];
            
         }

      
   }
   return letterPoints;
}


function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      let key = Object.keys(newPointStructure);

      if (key.includes(word[i])) {
         letterPoints += newPointStructure[word[i]]
         }
   }
   return letterPoints;
}


simpleScorerObject = {
   name: "Simple Score",
   description: "Each letter is worth 1 point",
   scorerFunction: simpleScorer
}

vowelBonusObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
}

simpleScrabbleObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scorerFunction: scrabbleScorer
}



const scoringAlgorithms = [simpleScorerObject, vowelBonusObject, simpleScrabbleObject];



function scorerPrompt(inputWord) {
   scorerSelection = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");
   scorerSelection = Number(scorerSelection);
   if (scorerSelection === 0) {
      console.log("algorithm name: ", scoringAlgorithms[0].name);
      console.log("score for", "'" + inputWord + "':", scoringAlgorithms[0].scorerFunction(inputWord));
   } else if (scorerSelection === 1) {
      console.log("algorithm name: ", scoringAlgorithms[1].name);
      console.log("score for", "'" + inputWord + "':", scoringAlgorithms[1].scorerFunction(inputWord));
   } else if (scorerSelection === 2) {
      console.log("algorithm name: ", scoringAlgorithms[2].name);
      console.log("score for", "'" + inputWord + "':", scoringAlgorithms[2].scorerFunction(inputWord));
   } else if (scorerSelection !== typeof Number || scorerSelection > 2 || scorerSelection < 0) {
      console.log("Select a number between 0-2");
   }
   return scoringAlgorithms
}

//key/value variables switch them so value/key in each iteration.

function transform(a) {
   let oldPointStructureTwo = {}
   let bewPointStructure = {}
   a = oldPointStructure


   for (let i = 0; i <= 26; i++) {
      for (let newPoints in a) {
         let letters = a[newPoints];
         oldPointStructureTwo[String(letters[i])] = Number(newPoints);
      }
      delete oldPointStructureTwo[undefined];

      for (let newerPoints in oldPointStructureTwo) {
         let lower = newerPoints.toLowerCase();
         let oldScore = oldPointStructureTwo[newerPoints]
         bewPointStructure[lower] = oldScore
      }
   }
   return bewPointStructure;
}

function bonus(a) {
   let bonusBonusBonus = {}
   let lastBonus = {}
   a = bonusPointStructure


   for (let i = 0; i <= 26; i++) {
      for (let newPoints in a) {
         let letters = a[newPoints];
         bonusBonusBonus[String(letters[i])] = Number(newPoints);
      }
      delete bonusBonusBonus[undefined];

      for (let newerPoints in bonusBonusBonus) {
         let lower = newerPoints.toLowerCase();
         let oldScore = bonusBonusBonus[newerPoints]
         lastBonus[lower] = oldScore
      }
   }
   return lastBonus;
}


function runProgram() {
   let inputWord = initialPrompt();
   scorerPrompt(inputWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
