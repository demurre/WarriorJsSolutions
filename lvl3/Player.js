class Player {
  playTurn(warrior) {
    if (
      warrior.feel().isEmpty() &&
      warrior.health() >= warrior.maxHealth() / 2
    ) {
      warrior.walk();
    } else if (
      warrior.feel().isEmpty() &&
      warrior.health() < warrior.maxHealth()
    ) {
      warrior.rest();
    } else if (warrior.health() < warrior.maxHealth() / 2) {
      warrior.walk("backward");
    } else warrior.attack();
  }
}
