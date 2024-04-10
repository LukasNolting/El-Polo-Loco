class ThrowableObject extends MovableObject {
  throwBottle = false;
  bottleBreak = false;
  isBreaking = false;
  bottlesplash_sound = new Audio('./audio/bottleBreak.mp3');
  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20,
  };


  constructor(x, y, direction) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 120;
    this.width = 110;
    this.otherDirection = direction;
    this.throwBottle();
    this.animate();
    this.bottlesplash_sound.volume = 0.1;
  }

  IMAGES_ROTATE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];


  /**
   * This function handles the throwing action. It sets the throwBottle property to true,
   * updates the speed in the y direction to 30, applies gravity, and moves the object
   * in the x direction based on the value of otherDirection.
   *
   */
  throwBottle() {
    this.throwBottle = true;
    this.speedY = 30;
    this.applyGravity();
    if (this.otherDirection == true) {
      setInterval(() => {
        this.x -= 10;
      }, 25);
    } else {
      setInterval(() => {
        this.x += 10;
      }, 25);
    }
  }


  /**
   * Function to break and splash the bottle
   */
  breakBottle() {
    if (!this.isBreaking) {
      this.throwBottle = false;
      this.isBreaking = true;
      if (!masterSound) {
        this.bottlesplash_sound.play();
      }
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH, () => {
        this.fadeOut();
      });
      this.speedY = 0;
      this.speedX = 0;
    }
  }


  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  animate() {
    setInterval(() => {
      if (this.throwBottle) {
        this.playAnimation(this.IMAGES_ROTATE);
      }
    }, 9000 / 60);
  }
}
