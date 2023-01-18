import PIXIWrapper from './wrappers/pixi-wrapper.js';
import City from './modules/city.js';
import Graph from './modules/graph.js';
import DeliveryMan from './modules/delivery-man.js';
import PrinterSprite from './sprites/printer-sprite.js';
import Printer from './modules/printer.js';
import PrinterManager from './modules/printer-manager.js';

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
    {
      x: 300,
      y: 400,
      width: 100,
      height: 100,
      label: '2',
    },
    {
      x: 300,
      y: 100,
      width: 100,
      height: 100,
      label: '3',
    },
  ],
};

const graphConfig = {
  machines: [
    { x: 200, y: 200, connectingNode: 2 },
    { x: 300, y: 400, connectingNode: 4 },
    { x: 300, y: 100, connectingNode: 3 },
  ],
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

class DeliveryManManager {
  constructor(app, graph, city, manager, startingNode, numOfDeliveryMan) {
    this.mans = [];
    this.loadDeliveryMans(numOfDeliveryMan, startingNode);
  }
  loadDeliveryMans(numOfDeliveryMan, startingNode) {
    for (let i = 0; i < numOfDeliveryMan; i++) {
      const man = new DeliveryMan(app, graph, city, startingNode);
      this.mans.push({
        object: man,
        isBusy: false,
      });
    }
  }
}

class OrderManager {
  constructor(orders, printerManager, deliveryManager) {
    this.orders = orders;
    this.printerStatus = [];
    this.printerManager = printerManager;
    this.deliveryManager = deliveryManager;
  }

  start() {
    const FRAME_RATE = 30;
    this.animation = setInterval(() => {
      if (!this.orders.length) return;
      const order = this.orders[0];
    }, 1000 / FRAME_RATE);
  }
}

const container = document.querySelector('.city-container');
const app = new PIXIWrapper(container);

const graph = new Graph(graphConfig);
graph.render(app);

const city = new City(app, cityConfig);
const manager = new PrinterManager('printer1', 'printer2', 'printer3');
manager.start();
manager.addQueue(4);
manager.addQueue(4);
manager.addQueue(4);
manager.addQueue(4);
manager.addQueue(4);
manager.addQueue(4);

const man = new DeliveryMan(app, graph, city, 0);

const order = {
  machine: 0,
  home: 0,
  completionTime: 5,
  printerAllocated: 0,
};

man.completeOrder(0, 0);

// man.moveShortestPath(3);

// const graph = new Graph(graphConfig);
// const result = graph.getHomeConnectingNode(0);
// console.log(result);
