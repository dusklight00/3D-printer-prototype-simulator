import { drawSquare } from "../utility/texture.js";

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
  renderCity(cityConfig) {
    cityConfig.forEach((squareConfig) => {
      const { x, y, width, height } = squareConfig;
      const square = drawSquare(x, y, width, height);
      this.render(square);
    });
  }
}
