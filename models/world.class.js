class World {

  character = new Character();
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  statusBarEndboss = new StatusBarEndboss();

  alert_sound = new Audio('./audio/alert.mp3');
  dead_sound = new Audio('./audio/chickenDead.mp3');
  collect_coin_sound = new Audio('./audio/collectcoin.mp3');
  collect_bottle_sound = new Audio('./audio/collectbottle.mp3');

  level = level1;
  enemies = level1.enemies;
  enemies = level1.smallEnemies;
  endboss = level1.endboss;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  Coins = level1.Coins;
  Bottles = level1.Bottles;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  addedCoins = [];
  addedBottles = [];
  throwableObjects = [];
  bottleBreak = false;
  endbossInRange = false;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.alert_sound.volume = 0.1;
    this.dead_sound.volume = 0.1;
    this.collect_coin_sound.volume = 0.1;
    this.collect_bottle_sound.volume = 0.1;
  }


  /**
   * Set the world for the character.
   */
  setWorld() {
    this.character.world = this;
    if (this.endboss[0]) {
      this.endboss[0].world = this;
    }
  }


  /**
   * Runs the function at regular intervals to check for various game conditions and update the game state accordingly.
   */
  run() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
    setInterval(() => {
      this.checkEndbossGetHit()
      this.checkCharacterPositionEndboss();
    }, 200);
    setInterval(() => {
      this.checkCollisions();
      if (this.endboss[0]) {
        this.checkBossRange();
      }
    }, 25);
  }


  /**
   * Checks if the character has energy bottle and the D key is pressed, then creates a new throwable object and adds it to the list of throwable objects.
   */
  checkThrowObjects() {
    if (this.character.energyBottle > 0) {
      if (this.keyboard.D) {
        this.character.setNewIdleTimePassed();
        let bottle = new ThrowableObject(this.character.x + 0, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.character.decreaseEnergyBottle();
        this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
      }
    }
  }


  /**
   * Check for collisions with various game elements.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkEndbossCollision();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkCollisionsWithGround();
    this.checkCollisionThrowableWithChicken();
  }


  /**
   * Check for collisions between the character and enemies,
   * handle the interactions accordingly.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy, index)) {
        if (this.character.isAboveGround() && this.character.speedY <= 0) {
          this.character.jumpOnEnemy();
          this.handleJumpEnemyCollision(enemy, index);
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }


  /**
   * Handle the collision with an enemy when jumping.
   *
   * @param {Object} enemy - The enemy object
   */
  handleJumpEnemyCollision(enemy) {
    const enemyIndex = this.level.enemies.indexOf(enemy);
    if (enemyIndex !== -1 && !enemy.isDead) {
      this.character.immune = true;
      if (!masterSound) {
        this.dead_sound.play();
      }
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
        this.character.immune = false;
      }, 250);
      enemy.isDead = true;
    }
  }


  /**
   * Check for collision with endboss and update character status.
   */
  checkEndbossCollision() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }


  /**
   * Checks for collisions between the character and coins in the level.
   */
  checkCoinCollisions() {
    this.level.Coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        this.collectCoin(coins, index);
      }
    });
  }


  /**
   * A description of the entire function.
   *
   * @param {type} coins - description of parameter
   * @param {type} index - description of parameter
   * @return {type} description of return value
   */
  collectCoin(coins, index) {
    this.character.addEnergyCoin();
    this.addedCoins.push({ coin: coins, index: index });
    if (!masterSound) {
      this.collect_coin_sound.play();
    }
    this.level.Coins.splice(index, 1);
    this.statusBarCoin.setPercentageCoin(this.character.energyCoin);
  }


  /**
   * Checks for collisions with bottles and collects them if the character's energy is not full.
   *
   */
  checkBottleCollisions() {
    this.level.Bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.character.energyBottle < 100) {
        this.collectBottle(bottle, index);
      }
    });
  }


  /**
   * This function collects a bottle at a specific index.
   *
   * @param {type} bottle - The bottle to collect
   * @param {type} index - The index of the bottle
   */
  collectBottle(bottle, index) {
    this.character.addEnergyBottle();
    this.addedBottles.push({ bottle: bottle, index: index });
    if (!masterSound) {
      this.collect_bottle_sound.play();
    }
    this.level.Bottles.splice(index, 1);
    this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
  }


  /**
   * Check if any throwable object collides with the endboss and handle the collision.
   */
  checkEndbossGetHit() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.endboss.forEach((endboss, endbossIndex) => {
        if (throwableObject.isColliding(endboss)) {
          this.handleEndbossCollision(throwableObject, endboss, throwableIndex, endbossIndex);
        }
      });
    });
  }


  /**
   * Check if the character is within range of the end boss.
   */
  checkBossRange() {
    if ((this.endboss[0].x - this.character.x < 600)) {
      this.endbossInRange = true;
    }
  }


  /**
   * A function to handle collision between a throwable object and the end boss.
   *
   * @param {Object} throwableObject - the object that can be thrown
   * @param {Object} endboss - the end boss object
   * @param {number} throwableIndex - the index of the throwable object
   * @param {number} endbossIndex - the index of the end boss
   */
  handleEndbossCollision(throwableObject, endboss, throwableIndex, endbossIndex) {
    endboss.hitBottleEndboss();
    endboss.decreaseEnergyEndboss();
    this.statusBarEndboss.setPercentageEndboss(this.level.endboss[0].energyEndboss);
    throwableObject.breakBottle();
    setTimeout(() => {
      this.throwableObjects.splice(throwableIndex, 1);
    }, 100);
    if (endboss.isDead) {
      setTimeout(() => {
        this.level.endboss.splice(endbossIndex, 1);
      }, 500);
    }
  }


  /**
   * Checks for collisions with the ground for each throwable object.
   */
  checkCollisionsWithGround() {
    this.throwableObjects.forEach((throwableObject, index) => {

      if (throwableObject.speedY < -38) {
        throwableObject.breakBottle();
        setTimeout(() => {
          this.throwableObjects.splice(index, 1);
        }, 300);
      }
    });
  }


  /**
   * A function that checks for collisions between throwable objects and chickens,
   * eliminates the enemy if hit, plays a sound effect, and removes the enemy from the level.
   */
  checkCollisionThrowableWithChicken() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          if (!enemy.isDead) {
            enemy.isDead = true;
            setTimeout(() => {
              if (!masterSound) {
                this.dead_sound.play();
              }
              this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 300);
          }
          throwableObject.breakBottle();
          this.throwableObjects.splice(throwableIndex, 1);
        }
      });
    });
  }


  /**
   * Function to draw the game elements on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.Coins);
    this.addObjectsToMap(this.Bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);

    if (this.endbossInRange) {
      this.addToMap(this.statusBarEndboss);
    }

    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * Add objects to the map.
   *
   * @param {Array} objects - The objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }


  /**
   * Method to add an item to the map.
   *
   * @param {type} mo - description of the parameter mo
   * @return {type} description of the return value
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }


  /**
   * Flips the given image horizontally.
   *
   * @param {type} mo - the image to be flipped
   * @return {type} undefined
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  /**
   * Flips the image back.
   *
   * @param {mo} mo - the image to be flipped
   * @return {void} no return value
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }


  /**
   * Check the character position relative to the endboss and move the endboss accordingly.
   */
  checkCharacterPositionEndboss() {
    const endboss = this.level.endboss[0];
    if (endboss && !endboss.isDead) {
      if (this.character.x > endboss.x + endboss.width) {
        endboss.otherDirection = true;
        endboss.moveLeft();
      } else if (this.character.x < endboss.x + 100) {
        endboss.otherDirection = false;
        endboss.moveRight();
      }
    }
  }

}