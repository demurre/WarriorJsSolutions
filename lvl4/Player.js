class Player {
  constructor() {
    this.health = 20;
  }

  playTurn(warrior) {
    if (this.isInjured(warrior) && !this.isUnderAttack(warrior)) {
      warrior.rest();
    } else {
      if (!warrior.feel().isEmpty()) {
        warrior.attack();
      } else {
        warrior.walk();
      }
    }

    this.health = warrior.health();
  }

  isInjured(warrior) {
    return warrior.health() < 20;
  }

  isUnderAttack(warrior) {
    return warrior.health() < this.health;
  }
}
