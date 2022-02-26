//const { exit } = require('process');
const characters = require('./characters');
const { game } = require('./rooms');
const prompts = require('prompts');

async function gameLoop() {
  let continueGame = true;

  // Example set of UI options for the user to select
  const initialActionChoices = [
    { title: 'Look around', value: 'lookAround' },
    { title: 'Go to Room', value: 'goToRoom' },
    { title: 'Attack', value: 'attack' },
    { title: 'Exit game', value: 'exit' },
  ];

  // Show the list of options for the user.
  // The execution does not proceed from here until the user selects an option.
  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Choose your action',
    choices: initialActionChoices,
  });

  // Deal with the selected value
  console.log('You selected ' + response.value);
  switch (response.value) {
    case 'lookAround':
      await game.lookAround();
      break;

    case 'goToRoom':
      await game.goToRoom();
      break;

    case 'attack':
      await game.attack();
      break;

    case 'exit':
      continueGame = false;
      break;
  }

  if (continueGame) {
    gameLoop();
  }
}

process.stdout.write('\033c'); // clear screen on windows

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!');
console.log('================================================');
console.log('You walk down the stairs to the dungeons');
gameLoop();
