import PIXIWrapper from "./wrappers/pixi-wrapper.js";

const app = new PIXIWrapper();

const city = [
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
  },
];

app.renderCity(city);
