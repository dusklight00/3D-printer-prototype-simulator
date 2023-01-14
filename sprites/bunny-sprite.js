export default class BunnySprite {
  constructor(app, x, y) {
    this.app = app;

    // Texture Paths
    const BUNNY_TEXTURE_PATH = "./assets/bunny.png";
    const NOTIFICATION_PATH = "./assets/has-model-icon.png";
    const BLANK_TEXTURE_PATH = "./assets/blank.png";

    // Loading Texture
    this.bunnyTexture = PIXI.Texture.from(BUNNY_TEXTURE_PATH);
    this.notificationTexture = PIXI.Texture.from(NOTIFICATION_PATH);
    this.blankTexture = PIXI.Texture.from(BLANK_TEXTURE_PATH);

    // Creating Sprite
    this.sprite = new PIXI.Sprite(this.bunnyTexture);
    this.notification = new PIXI.Sprite(this.notificationTexture);
    this.sprite.anchor.set(0.5);
    this.notification.anchor.set(0.5);

    // Creating a Container
    this.container = new PIXI.Container();
    this.container.addChild(this.sprite);
    this.container.addChild(this.notification);
    this.notification.y -= 60;
    this.container.x = x;
    this.container.y = y;
    app.render(this.container);
  }
  setNotification(status) {
    if (status) this.notification.texture = this.notificationTexture;
    else this.notification.texture = this.blankTexture;
  }
  setX(value) {
    this.container.x = value;
  }
  setY(value) {
    this.container.y = value;
  }
  moveRight(step) {
    this.container.x += step;
  }
  moveLeft(step) {
    this.container.x -= step;
  }
  moveUp(step) {
    this.container.y -= step;
  }
  moveDown(step) {
    this.container.y += step;
  }
}
