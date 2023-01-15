import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import Printer from "./modules/printer.js";

const container = document.getElementById("city-container");

// const app = new PIXIWrapper(container);

const printer1 = new Printer("printer1");
const printer2 = new Printer("printer2");
const printer3 = new Printer("printer3");

printer1.start();
printer2.start();
printer3.start();
