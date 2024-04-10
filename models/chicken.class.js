class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  isDead = false;
  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 10,
  };
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
  ];

  
 
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = this.width + 50 + Math.random() * 50;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    this.randomizePosition();
  }


  /**
   * Randomizes the position of the object.
   *
   */
  randomizePosition() {
    this.x = 300 + Math.random() * 2500;
   }


  /**
   * A function that animates the character by moving it left and playing different animations based on its state.
   *
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead === false) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (this.isDead === true) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 200);
  }
}