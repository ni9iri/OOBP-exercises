class Character {
  constructor(name, HP, hitDamage, hitChance) {
    this.name = name;
    this.HP = HP;
    this.hitDamage = hitDamage;
    this.hitChance = hitChance;
  }

  attack() {
    let hitRandom = Math.floor(Math.random() * 100);

    if (hitRandom < this.hitChance) {
      console.log('The attack was successful.');
      return this.hitDamage;
    }
    return null;
  }

  isAlive() {
    return this.HP < 0;
  }
}

class Player extends Character {
  constructor(name, HP, hitDamage, hitChance) {
    super(name, HP, hitDamage, hitChance);
  }
}

let player = new Player('Player1', 10, 2, 75);

class Enemy extends Character {
  constructor(name, HP, hitDamage, hitChance) {
    super(name, HP, hitDamage, hitChance);
  }
}

module.exports = {
  player,
  Character,
  Enemy,
};
