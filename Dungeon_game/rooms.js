const { player, Enemy } = require('./characters.js');
const prompts = require('prompts');
class Room {
  constructor(name, description, enemies) {
    this.name = name;
    this.description = description;
    this.enemies = enemies;
  }

  hasEnemies() {
    return this.enemies.length !== 0;
  }

  async attackEnemy(player) {
    const { value: monsterIndex } = await prompts({
      type: 'select',
      name: 'value',
      message: 'Which enemy do you want to attack?',
      choices: this.enemies.map(function (enemy, index) {
        return {
          title: enemy.name,
          value: index,
        };
      }),
    });

    const attackDamage = player.attack();
    if (attackDamage === null) {
      return console.log('Player attack but misses');
    }

    const monster = this.enemies[monsterIndex];
    monster.HP -= attackDamage;

    if (monster.isAlive()) {
      return console.log('... zbyva hp a ubral jsi..');
    }
    this.enemies.splice(monsterIndex, 1);
    console.log(`The ${monster.name} is dead.`);
    if (this.hasEnemies()) {
      return console.log(`The room has now ${this.enemies.length} monsters`);
    }

    return console.log('The room is clear. You may continue');
  }

  attackPlayer(enemy) {
    const attackDamage = player.attack();
    if (attackDamage === null) {
      return console.log('no hit');
    }
    const monster = this.enemies[0];
    monster.HP -= attackDamage;

    if (monster.isAlive()) {
      return console.log('... zbyva hp a ubral jsi..');
    }
  }
}

class Game {
  constructor(rooms, player) {
    this.rooms = rooms;
    this.player = player;
    this.currentRoomPosition = 0;
  }

  setupRoomChoices() {
    const roomChoices = [];

    const prevRoom = this.rooms[this.currentRoomPosition - 1];
    if (prevRoom) {
      roomChoices.push({
        title: prevRoom.name,
        value: prevRoom.name,
      });
    }

    const nextRoom = this.rooms[this.currentRoomPosition + 1];
    if (nextRoom) {
      roomChoices.push({
        title: nextRoom.name,
        value: nextRoom.name,
      });
    }

    return roomChoices;
  }

  lookAround() {
    const currentRoom = this.rooms[this.currentRoomPosition];
    console.log(`You are in a ${currentRoom.name} ${currentRoom.description}`);
    if (!currentRoom.hasEnemies()) {
      return console.log(
        'To continue the game you need to enter another room.'
      );
    }

    const monster = currentRoom.enemies[0];

    const attackDamage = monster.attack();
    if (attackDamage === null) {
      return console.log(`
      The monster is trying to attack the Player but misses. `);
    }
    this.player.HP -= attackDamage;
    if (this.player.isAlive()) {
      return console.log('... you get hited..');
    }

    console.log('The Player got killed by the monster. Game over.');
    process.exit();
  }

  async attack() {
    const currentRoom = this.rooms[this.currentRoomPosition];
    if (!currentRoom.hasEnemies()) {
      return console.log('No enemy left in the room. Continue your journey...');
    }

    await currentRoom.attackEnemy(this.player);
  }

  async goToRoom() {
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Which room do you want to select?',
      choices: this.setupRoomChoices(),
    });
    if (response.value === '') {
      return;
    }

    const index = rooms.findIndex((room) => room.name === response.value);
    this.currentRoomPosition = index;
    const room = rooms[index];
    console.log(`You move to ${room.name}`);
    console.log('-------------------------');
    console.log('You look around');
    console.log(`You are in ${room.name}${room.description}`);
    console.log('There are doors leading to: ');

    if (this.rooms[this.currentRoomPosition].name == 'Portal') {
      return process.exit();
    }

    console.log('you selected', response.value);

    const prevRoom = rooms[index - 1];
    if (prevRoom) {
      console.log(prevRoom.name);
    }

    const nextRoom = rooms[index + 1];
    if (nextRoom) {
      console.log(nextRoom.name);
    }
  }
}

const rooms = [
  new Room(
    'The dungeon entrance',
    ' and it is a big and damp room with broken statues all around\n',
    []
  ),
  new Room(
    'Hallway',
    ' and it is a long and dark hallway with dark pools of water on the floor and some fungus growing on the walls\n',
    [
      new Enemy('Sewer Rat', 2, 1, 50),
      // Options for multiple monsters
      // new Enemy('Sewer Rat', 2, 1, 50),
      // new Enemy('Sewer Rat', 2, 1, 50),
    ]
  ),
  new Room(
    'Chamber',
    ' and it is a small chamber, which is illuminated by a glowing portal\n ',
    [
      new Enemy('Giant Dragon', 4, 8, 90),
      new Enemy('Giant Dragon', 4, 8, 90),
      new Enemy('Giant Dragon', 4, 8, 90),
    ]
  ),
  new Room('Portal', '\nCongratulations, you made through the dungeon!', []),
];

module.exports = {
  rooms,
  game: new Game(rooms, player),
};
