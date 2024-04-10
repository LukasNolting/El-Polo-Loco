class Coin extends MovableObject {
  height = 120;
  width = 120;
  IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  offset = {
    left: 50,
    top: 60,
    right: 50,
    bottom: 60,
  };


  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }


  /**
   * Randomizes the position of the object within a specific range.
   */
  randomizePosition() {
    this.x = 500 + Math.random() * 1500;
    this.y = 125 + Math.random() * 200;
  }


  /**
   *  Animate function that continuously plays the animation with a set interval.
   *
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}


class Bottle extends MovableObject {
  height = 90;
  width = 90;
  y = 340;
  static lastBottleX = 320;
  offset = { top: 10, bottom: 10, left: 30, right: 10 };
  
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ]


  constructor() {
    let randomize = Math.round(Math.random());
    super().loadImage(this.IMAGES_BOTTLE[randomize]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.setInitialPosition();
  }


  /**
   * Set the initial position of the object.
   *
   */
  setInitialPosition() {
    this.x = this.width + 150 + Math.random() * 2000;
  }

}

