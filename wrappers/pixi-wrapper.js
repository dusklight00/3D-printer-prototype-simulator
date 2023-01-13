export default class PIXIWrapper {
  constructor() {
    this.instance = new PIXI.Application({ antialias: true });
    document.body.appendChild(this.instance.view);
  }
  render(...graphics) {
    graphics.forEach((graphic) => {
      this.instance.stage.addChild(graphic);
    });
  }
}
