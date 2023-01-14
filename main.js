import { drawAnchorDownSquare } from "./utility/texture.js";
import PIXIWrapper from "./wrappers/pixi-wrapper.js";

const app = new PIXIWrapper();
const square = drawAnchorDownSquare(200, 200, 100, 50);

const city = [
  {
    x: 70,
    y: 80,
    width: 80,
    height: 90,
  },
  {
    x: 70,
    y: 220,
    width: 80,
    height: 100,
  },
  {
    x: 70,
    y: 360,
    width: 80,
    height: 70,
  },
  {
    x: 225,
    y: 500,
    width: 400,
    height: 100,
  },

  {
    x: 300,
    y: 153,
    width: 240,
    height: 237,
  },

  {
    x: 300,
    y: 360,
    width: 250,
    height: 70,
  },

  {
    x: 610,
    y: 155,
    width: 250,
    height: 237,
  },

  {
    x: 610,
    y: 336,
    width: 250,
    height: 120,
  },

  {
    x: 610,
    y: 500,
    width: 250,
    height: 100,
  },
];

app.renderCity(city);
