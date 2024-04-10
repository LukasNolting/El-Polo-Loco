class Character extends MovableObject {
  height = 280;
  y = 40;
  speed = 10;
  idleTimePassed = 0;
  world;
  walking_sound = new Audio("audio/running.mp3");
  dead_sound = new Audio('./audio/character-death.mp3');
  offset = {
    left: 20,
    top: 110,
    right: 25,
    bottom: 10,
  };

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  IMAGES_SLEEPING = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];


  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.animate();
    this.dead_sound.volume = 0.1;
    this.walking_sound.volume = 0.1;
  }


  /**
   * Function to animate the character by repeatedly calling moveCharacter, actionsCharacter, and updateCamera at a specific interval, and updateCharacterState at a different interval.
   */
  animate() {
    setInterval(() => {
      this.moveCharacter();
      this.actionsCharacter();
      this.updateCamera();
    }, 1000 / 60);

    setInterval(() => {
      this.updateCharacter();
    }, 100);
  }


  /**
   *  
   *  
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  moveCharacter() {
    this.walking_sound.pause();

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!masterSound) {
        this.walking_sound.play();
      }
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      if (!masterSound) {
        this.walking_sound.play();
      }
    }
  }


  /**
   * Actions character based on keyboard input and character's position.
   */
  actionsCharacter() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
    }
  }


  /**
   * Updates the camera position based on the current object position.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }


  /**
   * Updates the character's behavior based on its current state.
   *
   */
  updateCharacter() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        gameOver();
      }, 600);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.setNewIdleTimePassed();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.setNewIdleTimePassed();
    } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
      const idleTimePassed = this.timeLastAction();
      this.characterIdleOrSleep(idleTimePassed);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
      this.setNewIdleTimePassed();
    }
  }


  /**
   * A function to determine whether the character should be idle or sleeping based on the idle time passed.
   *
   * @param {number} idleTimePassed - the amount of idle time passed in hours
   */
  characterIdleOrSleep(idleTimePassed) {
    if (idleTimePassed >= 6) {
      this.playAnimation(this.IMAGES_SLEEPING);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }


  /**
   * Sets a new value for idleTimePassed property.
   */
  setNewIdleTimePassed() {
    this.idleTimePassed = new Date().getTime();
  }


  /**
   * Calculate the time elapsed since the last action.
   *
   * @return {number} the time elapsed in seconds
   */
  timeLastAction() {
    return (new Date().getTime() - this.idleTimePassed) / 1000;
  }

}

