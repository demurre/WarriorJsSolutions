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

    if (this.isEnemyInSight(warrior, "backward")) {
      warrior.shoot("backward");
      return;
    } else if (this.isEnemyInSight(warrior, "forward")) {
      warrior.shoot("forward");
      return;
    }

    if (this.isUnderAttack(warrior) && this.hasNotEnoughHealth(warrior)) {
      this.movement(warrior, "backward");
      return;
    } else if (this.isUnderAttack(warrior)) {
      this.movement(warrior, "forward");
      return;
    }

    if (this.isInjured(warrior)) {
      warrior.rest();
      return;
    }

    this.movement(warrior, "forward");
  }

  movement(warrior, direction) {
    const space = warrior.feel(direction);

    if (space.isWall()) {
      if (direction === "backward") {
        this.isMovingBackward = false;
      }
    } else if (space.isUnit() && space.getUnit().isBound()) {
      warrior.rescue(direction);
      return;
    } else if (space.isEmpty()) {
      if (this.hasNotEnoughHealth(warrior)) {
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

  hasNotEnoughHealth(warrior) {
    return warrior.health() < warrior.maxHealth() / 2;
  }

  isEnemyInSight(warrior, direction) {
    let view = warrior.look(direction).find((space) => !space.isEmpty());
    return view && !view.isWall() && view.getUnit().isEnemy();
  }
}
