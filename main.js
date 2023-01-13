import Graph from "./graph.js";
import PIXIWrapper from "./pixi-wrapper.js";
import { drawLine, drawPoint, drawSquare } from "./texture.js";
import {
  checkArrContainsArr,
  convertRadianToDegree,
  findAngleMadeByTwoPoints,
  findComponents,
  findDistanceBetweenTwoPoints,
} from "./utils.js";

const graphConfig = {
  nodes: [
    {
      index: 0,
      x: 100,
      y: 200,
    },
    {
      index: 1,
      x: 200,
      y: 100,
    },
    {
      index: 2,
      x: 300,
      y: 200,
    },
    {
      index: 3,
      x: 400,
      y: 100,
    },
    {
      index: 4,
      x: 200,
      y: 300,
    },
  ],
  matrix: [
    [0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
};

class Man {
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
      console.log(
        convertRadianToDegree(angle),
        this.coord.x,
        this.coord.y,
        x,
        y
      );
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
        // console.log(horizontalStepSize);
        this.moveRight(horizontalStepSize);
        this.moveUp(verticalStepSize);
        totalStepRequired -= 1;
      }, 1000 / this.FRAME_RATE);
    });
  }
}

const app = new PIXIWrapper();
const man = new Man(app, 100, 100);

(async function () {
  await man.move(200, 200);
  await man.move(100, 100);
  await man.move(200, 200);
  await man.move(100, 300);
  await man.move(200, 200);
})();
