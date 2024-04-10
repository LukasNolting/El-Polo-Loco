class Endboss extends MovableObject {
  speedIfAngry = 2;
  speed = 0.15;
  isDead = false;
  inDamage = false;
  isAlert = false;
  moveLeftAngry = false;
  aggressive = false;
  endbossImmune = false;
  energyEndboss = 100;
  otherDirection = false;
  height = 400;
  width = 280;
  y = 60;
  endbossdead_sound = new Audio('./audio/endbossdead.mp3');
  alert_sound = new Audio('./audio/alert.mp3');
  offset = {
    top: 150,
    bottom: 100,
    left: 45,
    right: 30
  }
  world;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_IDLE = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',

  ];


  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 2200;
    this.moveLeftAngry = false;
    this.animate();
    this.endbossdead_sound.volume = 0.1;
    this.endbossdead_sound.loop = false;
    this.alert_sound.volume = 0.1;
  }


  /**
   * A function that hits the Bottle Endboss.
   *
   */
  hitBottleEndboss() {
    this.inDamage = true;
    setTimeout(() => {
      this.inDamage = false;
    }, 400);
  }


  /**
   *  Decreases energy from the endboss and update related properties.
   *
   */
  decreaseEnergyEndboss() {
    if (!this.endbossImmune) {
      this.endbossImmune = true;
      this.energyEndboss -= 21;
      this.speed += 0.3;
      if (this.energyEndboss < 0) {
        this.energyEndboss = 0;
        this.isDeadEndboss();
      } else {
        this.lastHit = new Date().getTime();
      }
      setTimeout(() => {
        this.endbossImmune = false;
      }, 200);
    }
    this.checkAngryEndboss();
  }


  /**
   * Check if the energy of the endboss is less than or equal to 20. 
   * If true, set isAlert to true, moveLeftAngry to false, play alert sound, and then set isAlert to false and moveLeftAngry to true after 1500ms.
   */
  checkAngryEndboss() {
    if (this.energyEndboss <= 20) {
      this.isAlert = true;
      this.moveLeftAngry = false;
      setTimeout(() => {
        if (!masterSound) {
          this.alert_sound.play();
        }
      }, 10);
      setTimeout(() => {
        this.isAlert = false;
        this.moveLeftAngry = true;

      }, 1500);
    }
  }


  /**
   * Move the endboss to the left if it's angry.
   *
   */
  moveLeftIfEndbossIsAngry() {
    this.x -= this.speedIfAngry;
  }


  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  moveRightIfEndbossIsAngry() {
    this.x += this.speedIfAngry;
  }


  /**
   * Check if the Endboss is dead based on energy level.
   */
  isDeadEndboss() {
    if (this.energyEndboss <= 0) {
      this.isDead = true;
    }
  }


  /**
   * A method to animate something.
   */
  animate() {
    this.setMovementInterval();
    this.setupEndbossInterval();
  }


  /**
   * Set a movement interval based on certain conditions.
   */
  setMovementInterval() {
    setInterval(() => {
      if (this.world && this.world.endbossInRange) {
        if (this.isAlert) {
          this.speed = 0;
          return;
        }
        if (this.moveLeftAngry) {
          if (this.otherDirection) {
            this.moveRightIfEndbossIsAngry();
          } else {
            this.moveLeftIfEndbossIsAngry();
          }
        } else {
          if (this.otherDirection) {
            this.moveRight();
          } else {
            this.moveLeft();
          }
        }
      }
    }, 1000 / 60);
  }


  /**
   * Sets up an interval to update the character periodically.
   *
   */
  setupEndbossInterval() {
    setInterval(() => {
      this.updateCharacter();
    }, 9000 / 60);
  }


  /**
   * Updates the character based on its current state and conditions.
   */
  updateCharacter() {
    if (this.isDead) {
      this.checkIfCharacterIsDead();
    } else if (this.aggressive) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isAlert) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.inDamage) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }



  checkIfCharacterIsDead() {
    this.playAnimation(this.IMAGES_DEAD);
    if (!masterSound) {
      this.endbossdead_sound.play().volume = 0.1;
    }
    setTimeout(() => {
      winGame();
    }, 700);
  }
}