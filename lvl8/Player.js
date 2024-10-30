class Player {
  constructor() {
    this.health = 20;
    this.isMovingBackward = false;
  }

  playTurn(warrior) {
    if (warrior.feel().isWall()) {
      warrior.pivot();
      return;
    }

    if (this.isEnemyInSight(warrior)) {
      warrior.shoot();
      return;
    }

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
    } else if (space.isEmpty()) {
      if (this.isInjured(warrior) && !this.isUnderAttack(warrior)) {
        warrior.rest();
      } else if (this.shouldRetreat(warrior)) {
        this.isMovingBackward = true;
      } else {
        warrior.walk(direction);
      }
    } else if (space.isUnit() && space.getUnit().isEnemy()) {
      warrior.attack(direction);
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

  isEnemyInSight(warrior) {
    let view = warrior.look().find((space) => !space.isEmpty());
    return view && !view.isWall() && view.getUnit().isEnemy();
  }
}
