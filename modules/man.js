import { drawPoint } from "../utility/texture.js";
import {
  convertRadianToDegree,
  findAngleMadeByTwoPoints,
  findComponents,
  findDistanceBetweenTwoPoints,
} from "../utility/utils.js";

export default class Man {
  constructor(app, sprite) {
    this.app = app;
    this.sprite = sprite;
    this.coord = { x: sprite.container.x, y: sprite.container.y };

    this.STEP_SIZE = 1;
    this.FRAME_RATE = 60;
  }
  moveLeft(stepSize) {
    this.coord.x -= stepSize;
    this.sprite.container.x -= stepSize;
  }
  moveRight(stepSize) {
    this.coord.x += stepSize;
    this.sprite.container.x += stepSize;
  }
  moveUp(stepSize) {
    this.coord.y -= stepSize;
    this.sprite.container.y -= stepSize;
  }
  moveDown(stepSize) {
    this.coord.y += stepSize;
    this.sprite.container.y += stepSize;
  }
  move(x, y) {
    const THRESHOLD_MIN_DISTANCE = 0.001;
    const currentDistance = findDistanceBetweenTwoPoints(
      this.coord.x,
      this.coord.y,
      x,
      y
    );
    if (currentDistance < THRESHOLD_MIN_DISTANCE) return false;
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
        this.moveDown(verticalStepSize);
        totalStepRequired -= 1;
      }, 1000 / this.FRAME_RATE);
    });
  }
}
