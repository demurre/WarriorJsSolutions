class Player {
  constructor() {
    this.health = 20;
    this.isMovingBackward = false;
  }

  playTurn(warrior) {
    const direction = this.isMovingBackward ? "backward" : "forward";
    this.handleMovement(warrior, direction);

    this.health = warrior.health();
  }

  handleMovement(warrior, direction) {
    const space = warrior.feel(direction);

    if (space.isWall()) {
      if (direction === "backward") {
        this.isMovingBackward = false;
      }
    } else if (space.isUnit() && space.getUnit().isBound()) {
      warrior.rescue(direction);
      if (direction === "backward") {
        this.isMovingBackward = false;
      }
    } else {
      if (direction === "backward") {
        warrior.walk("backward");
      } else {
        this.handleForwardAction(warrior);
      }
    }
  }

  handleForwardAction(warrior) {
    const spaceInFront = warrior.feel();

    if (spaceInFront.isEmpty()) {
      if (this.isInjured(warrior) && !this.isUnderAttack(warrior)) {
        warrior.rest();
      } else if (this.shouldRetreat(warrior)) {
        this.isMovingBackward = true;
      } else {
        warrior.walk();
      }
    } else {
      this.handleEncounter(warrior, spaceInFront.getUnit());
    }
  }

  handleEncounter(warrior, unit) {
    if (unit && unit.isBound()) {
      warrior.rescue();
    } else {
      warrior.attack();
    }
  }

  isInjured(warrior) {
    return warrior.health() < warrior.maxHealth();
  }

  isUnderAttack(warrior) {
    return warrior.health() < this.health;
  }

  shouldRetreat(warrior) {
    return (
      this.isUnderAttack(warrior) && warrior.health() < warrior.maxHealth() / 2
    );
  }
}
