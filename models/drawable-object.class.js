class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;


  /**
   * A description of the entire function.
   *
   * @param {type} path - description of parameter
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Draws an image on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * Draw the frame for specific instances on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Smallchicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "0";
      ctx.strokeStyle = "transparent";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }


  /**
   * A function that loads images from an array of paths into the image cache.
   *
   * @param {Array} arr - an array of image paths
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    })
  }
}