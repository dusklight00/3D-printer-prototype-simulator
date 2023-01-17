import { drawSquare } from '../utility/texture.js';
import PrinterSprite from '../sprites/printer-sprite.js';
import HomeSprite from '../sprites/home-sprite.js';

export default class City {
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
      const machine = new PrinterSprite(
        this.app,
        config.x,
        config.y,
        config.label
      );
      machines.push(machine);
    });
    return machines;
  }
  setMachineNotification(index, status) {
    const machine = this.machines[index];
    machine.setNotification(status);
  }
}
