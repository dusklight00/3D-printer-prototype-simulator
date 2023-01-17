import Graph from "./modules/graph.js";
import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import DeliveryMan from "./modules/delivery-man.js";
import Printer from "./modules/printer.js";

const container = document.querySelector(".city-container");
const app = new PIXIWrapper(container);

export const graphConfig = {
  machines: [{ x: 200, y: 200, connectingNode: 2 }],
  homes: [
    {
      x: 50,
      y: 50,
      connectingNode: 0,
    },
  ],
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

const order = {
  machine: 0,
  home: 0,
};

const graph = new Graph(graphConfig);
graph.render(app);

const man = new DeliveryMan(app, graph, 0);
man.completeOrder(order);

const printer = new Printer("printer1");
printer.completeWork(10);
