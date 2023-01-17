import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import PrinterSprite from "./sprites/printer-sprite.js";

const container = document.querySelector(".city-container");
const app = new PIXIWrapper(container);
const printer = new PrinterSprite(app, 100, 100);
printer.setNotification(true);
