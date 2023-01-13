import PIXIWrapper from "./pixi-wrapper.js";
import { Man } from "./man.js";

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

const app = new PIXIWrapper();
const man = new Man(app, 100, 100);

(async function () {
  await man.move(200, 200);
  await man.move(100, 300);
  await man.move(200, 200);
  await man.move(100, 100);
  await man.move(200, 200);
  await man.move(300, 200);
})();
