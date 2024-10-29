class Player {
  constructor() {
    this.health = 20;
  }

  playTurn(warrior) {
    if (warrior.feel().isEmpty()) {
      if (this.isInjured(warrior) && !this.isUnderAttack(warrior)) {
        warrior.rest();
      } else {
        warrior.walk();
      }
    } else {
      const unit = warrior.feel().getUnit();

      if (unit && unit.isBound()) {
        warrior.rescue();
      } else {
        warrior.attack();
      }
    }
    this.health = warrior.health();
  }

  isInjured(warrior) {
    return warrior.health() < warrior.maxHealth();
  }

  isUnderAttack(warrior) {
    return warrior.health() < this.health;
  }
}
