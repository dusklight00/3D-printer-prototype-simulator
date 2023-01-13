export default class PIXIWrapper {
  constructor() {
    this.app = new PIXI.Application({ antialias: true });
    document.body.appendChild(this.app.view);
  }
  render(...graphics) {
    graphics.forEach((graphic) => {
      this.app.stage.addChild(graphic);
    });
  }
}
