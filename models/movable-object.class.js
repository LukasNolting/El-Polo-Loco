class MovableObject extends DrawableObject {
  speedIfAngry = 0.15;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accleration = 2.5;
  energy = 100;
  energyBottle = 0;
  energyCoin = 0;
  energyEndboss = 100;
  lastHit = 0;
  immune = false;
  hurt_sound = new Audio('./audio/hurt.mp3');
  jump_sound = new Audio('./audio/jump.mp3');

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };


  constructor() {
    super();
    this.hurt_sound.volume = 0.1;
    this.jump_sound.volume = 0.1;
  }


  /**
   * Applies gravity to the object's vertical position over time.
   *
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accleration;
      }
    }, 1000 / 25);
  }


  /**
   * Check if the object is above the ground.
   *
   * @return {boolean} true if the object is above the ground, false otherwise
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }


  /**
   * Determines if this object is colliding with another object.
   *
   * @param {Object} mo - The other object to check for collision with.
   * @return {boolean} Returns true if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  /**
   * Function to handle when the player is hit.
   */
  hit() {
    if (!this.immune) {
      this.immune = true;
      if (!masterSound) {
        this.hurt_sound.play();
      }
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
      setTimeout(() => {
        this.immune = false;
      }, 1000);
    }
  }


  /**
   *  addEnergyBottle function that increments this.energyBottle by 20 and caps it at 100.
   */
  addEnergyBottle() {
    this.energyBottle += 20;
    if (this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }


  /**
   * Decreases the energy bottle by 20 units, setting it to 0 if it goes below 0.
   */
  decreaseEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
      this.energyBottle = 0;
    }
  }


  /**
   * Function to add energy coins.
   */
  addEnergyCoin() {
    this.energyCoin += 20;
    if (this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }


  /**
   * Check if the entity is dead based on energy level.
   *
   * @return {boolean} true if the entity's energy is 0, false otherwise
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * A function to check if the entity is hurt based on the time since the last hit.
   *
   * @return {boolean} Indicates if the entity is hurt or not.
   */
  isHurt() {
    let idleTimePassed = new Date().getTime() - this.lastHit; // Difference in ms
    idleTimePassed = idleTimePassed / 1000; // Difference in s
    return idleTimePassed < 1;
  }


  /**
   * A function that plays an animation using the provided images.
   *
   * @param {array} images - an array of image paths for the animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * move the object to the right
   *
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Function to move the object to the left.
   *
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * A method to make the character jump.
   *
   */
  jump() {
    if (!masterSound) {
      this.jump_sound.play();
    }
    this.speedY = 25;
    if (this.y <= 150) {
      this.y = 150;
    }
  }


  /**
   * A method to make the character jump on the enemy.
   */
  jumpOnEnemy() {
    this.speedY = 15;
  }

}




