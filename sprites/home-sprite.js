import { drawSquare } from "../utility/texture.js";

export default class HomeSprite {
  constructor(app, x, y, label = "") {
    this.app = app;

    const HOME_WIDTH = 50;
    const HOME_HEIGHT = 50;

    const NOTIFICATION_PATH = "./assets/has-model-icon.png";
    const BLANK_TEXTURE_PATH = "./assets/blank.png";

    const HOME_STROKE_COLOR = 0x0099ff;
    const HOME_FILL_COLOR = 0x0099ff;

    this.notificationTexture = PIXI.Texture.from(NOTIFICATION_PATH);
    this.blankTexture = PIXI.Texture.from(BLANK_TEXTURE_PATH);

    this.home = drawSquare(
      0,
      0,
      HOME_WIDTH,
      HOME_HEIGHT,
      HOME_FILL_COLOR,
      HOME_STROKE_COLOR
    );
    this.notification = new PIXI.Sprite(this.notificationTexture);
    this.notification.anchor.set(0.5);
    this.label = new PIXI.Text(label);
    this.label.style.fill = ["#ffffff"];
    this.label.style.height = "50px";
    this.label.x -= this.label.width / 2;
    this.label.y -= 18;

    this.container = new PIXI.Container();
    this.container.addChild(this.home);
    this.container.addChild(this.notification);
    this.container.addChild(this.label);
    this.notification.y -= 55;
    this.container.x = x;
    this.container.y = y;
    app.render(this.container);
    this.setNotification(false);
  }
  setNotification(status) {
    if (status) this.notification.texture = this.notificationTexture;
    else this.notification.texture = this.blankTexture;
  }
}
