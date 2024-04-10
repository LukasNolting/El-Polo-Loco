class Cloud extends MovableObject {
  y = 0;
  height = 250;
  static lastCloudX = 50; // Startposition der ersten Wolke auf der x-Achse


  constructor() {
    super().loadImage('/el_polo_loco/img/5_background/layers/4_clouds/1.png');
    this.width = 500;
    this.setInitialPosition();
    this.moveClouds();
  }


  /**
   * Set the initial position of the object.
   */
  setInitialPosition() {
    this.x = Cloud.lastCloudX - 5500;
    Cloud.lastCloudX += this.width + 50 + Math.random() * 50;
  }


  /**
   * A method to move the clouds continuously.
   *
   */
  moveClouds() {
    setInterval(() => {
      this.x -= 0.2;
    }, 1000 / 60);
  }
}