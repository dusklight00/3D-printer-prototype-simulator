import Graph from "./graph.js";
import PIXIWrapper from "./pixi-wrapper.js";
import { drawLine, drawPoint, drawSquare } from "./texture.js";
import { checkArrContainsArr } from "./utils.js";

const app = new PIXIWrapper();

class Man {
  constructor(app, x, y) {
    this.app = app;
    this.man = drawPoint(x, y);
    this.coord = { x, y };
    this.app.render(this.man);
  }
  moveLeft(stepSize) {
    this.man.x -= stepSize;
  }
  moveRight(stepSize) {
    this.man.x += stepSize;
  }
  moveUp(stepSize) {
    this.man.y -= stepSize;
  }
  moveDown(stepSize) {
    this.man.y += stepSize;
  }
}

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

const graph = new Graph(graphConfig);
graph.render(app);
