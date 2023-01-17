import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import HomeSprite from "./sprites/home-sprite.js";

const container = document.querySelector(".city-container");
const app = new PIXIWrapper(container);
const printer = new HomeSprite(app, 100, 100, "1");
// printer.setNotification(true);
