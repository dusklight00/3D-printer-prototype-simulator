import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import HomeSprite from "./sprites/home-sprite.js";
import { drawSquare } from "./utility/texture.js";
import PrinterSprite from "./sprites/printer-sprite.js";

class City {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.renderBuildings(config.buildings);
    // Rendering Home and Machines
    this.machines = this.renderMachines(config.machines);
    this.homes = this.renderHomes(config.homes);
  }
  renderHomes(homeConfigs) {
    const homes = [];
    homeConfigs.forEach((config) => {
      const home = new HomeSprite(this.app, config.x, config.y, config.label);
      homes.push(home);
    });
    return homes;
  }
  renderBuildings(buildingConfig) {
    buildingConfig.forEach((config) => {
      const building = drawSquare(
        config.x,
        config.y,
        config.width,
        config.height
      );
      this.app.render(building);
    });
  }
  renderMachines(machineConfig) {
    const machines = [];
    machineConfig.forEach((config) => {
      // machines.push(machine);
    });
  }
}

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
      x: 500,
      y: 100,
      width: 100,
      height: 100,
    },
  ],
};

const container = document.querySelector(".city-container");
const app = new PIXIWrapper(container);
const machine = new PrinterSprite(app, 100, 100, "2");
