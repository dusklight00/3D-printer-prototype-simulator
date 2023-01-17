import PIXIWrapper from './wrappers/pixi-wrapper.js';
import City from './modules/city.js';
import Graph from './modules/graph.js';
import DeliveryMan from './modules/delivery-man.js';
import PrinterSprite from './sprites/printer-sprite.js';
import Printer from './modules/printer.js';

const cityConfig = {
  homes: [
    {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      label: '1',
    },
  ],
  buildings: [
    // {
    //   x: 300,
    //   y: 100,
    //   width: 100,
    //   height: 100,
    // },
  ],
  machines: [
    {
      index: 0,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      label: '1',
    },
  ],
};

const graphConfig = {
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

const container = document.querySelector('.city-container');
const app = new PIXIWrapper(container);

const graph = new Graph(graphConfig);
graph.render(app);

const city = new City(app, cityConfig);

const printer1 = new Printer('printer1');
const printer2 = new Printer('printer2');
const printer3 = new Printer('printer3');

const printers = [printer1, printer2, printer3];

const man = new DeliveryMan(app, graph, city, printers, 0);

const order = {
  machine: 0,
  home: 0,
  completionTime: 1,
  printerAllocated: 0,
};

man.completeOrder(order);

// man.moveShortestPath(3);

// const graph = new Graph(graphConfig);
// const result = graph.getHomeConnectingNode(0);
// console.log(result);
