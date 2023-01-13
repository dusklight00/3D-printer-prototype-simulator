import { drawPoint } from "./texture.js";
import {
  findAngleMadeByTwoPoints,
  convertRadianToDegree,
  findComponents,
  findDistanceBetweenTwoPoints,
} from "./utils.js";

export class Man {
  constructor(app, x, y) {
    this.app = app;
    this.man = drawPoint(x, y);
    this.coord = { x, y };
    this.app.render(this.man);

    this.STEP_SIZE = 1;
    this.FRAME_RATE = 60;
  }
  moveLeft(stepSize) {
    this.coord.x -= stepSize;
    this.man.x -= stepSize;
  }
  moveRight(stepSize) {
    this.coord.x += stepSize;
    this.man.x += stepSize;
  }
  moveUp(stepSize) {
    this.coord.y -= stepSize;
    this.man.y -= stepSize;
  }
  moveDown(stepSize) {
    this.coord.y += stepSize;
    this.man.y += stepSize;
  }
  move(x, y) {
    return new Promise((resolve, reject) => {
      const angle = findAngleMadeByTwoPoints(this.coord.x, this.coord.y, x, y);
      const stepSizeComponents = findComponents(this.STEP_SIZE, angle);
      const horizontalStepSize = stepSizeComponents.x;
      const verticalStepSize = stepSizeComponents.y;
      const totalDistance = findDistanceBetweenTwoPoints(
        this.coord.x,
        this.coord.y,
        x,
        y
      );

      let totalStepRequired = Math.floor(totalDistance / this.STEP_SIZE);
      const animation = setInterval(() => {
        if (totalStepRequired == 0) {
          clearInterval(animation);
          resolve();
        }
        this.moveRight(horizontalStepSize);
        this.moveUp(verticalStepSize);
        totalStepRequired -= 1;
      }, 1000 / this.FRAME_RATE);
    });
  }
}
