import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import City from "./modules/city.js";

const cityConfig = {
  homes: [
    {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      label: "1",
    },
  ],
  buildings: [
    {
      x: 300,
      y: 100,
      width: 100,
      height: 100,
    },
  ],
  machines: [
    {
      index: 0,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      label: "1",
    },
  ],
};

const container = document.querySelector(".city-container");
const app = new PIXIWrapper(container);
const city = new City(app, cityConfig);
