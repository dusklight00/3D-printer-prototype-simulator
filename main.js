import Printer from './modules/printer.js';
import PIXIWrapper from './wrappers/pixi-wrapper.js';
import PrinterManager from './modules/printer-manager.js';
import City from './modules/city.js';
import Graph from './modules/graph.js';
import { cityConfig, graphConfig } from './data.js';
import DeliveryMan from './modules/delivery-man.js';
import { generateUUID } from './utility/utils.js';

class DeliveryManManager {
  constructor(
    app,
    graph,
    city,
    printerManager,
    numOfDeliveryMan,
    startingNode
  ) {
    this.men = [];
    this.queue = [];
    this.printerManager = printerManager;
    for (let i = 0; i < numOfDeliveryMan; i++) {
      const man = new DeliveryMan(
        app,
        graph,
        city,
        printerManager,
        startingNode
      );
      this.men.push({
        object: man,
        isBusy: false,
      });
    }
  }
  addOrder(order, machineIndex) {
    const id = generateUUID();
    this.queue.push({
      id: id,
      machine: machineIndex,
      ...order,
    });
    return id;
  }

  findOrder(id) {
    for (let i in this.queue) {
      const order = this.queue[i];
      if (order.id === id) return order;
    }
    return null;
  }

  getUnshippedOrders() {
    const orders = [];
    this.queue.forEach((order) => {
      if (order.isShipped) return;
      if (order.isShipping) return;
      orders.push(order);
    });
    return orders;
  }
  getLastUnshippedOrder() {
    const unshippedOrders = this.getUnshippedOrders();
    if (unshippedOrders.length == 0) return null;
    const lastUnshippedOrder = unshippedOrders[0];
    return lastUnshippedOrder;
  }
  getFreeMen() {
    const men = [];
    this.men.forEach((man) => {
      const isBusy = man.isBusy;
      if (!isBusy) men.push(man);
    });
    return men;
  }
  getLastFreeMen() {
    const men = this.getFreeMen();
    if (men.length === 0) return null;
    return men[0];
  }
  async deliveryLastUnshippedOrder() {
    const man = this.getLastFreeMen();
    const order = this.getLastUnshippedOrder();
    if (man === null) return;
    if (order === null) return;
    const homeIndex = order.home;
    const machineIndex = order.machine;
    man.isBusy = true;
    order.isShipping = true;
    await man.object.completeOrder(homeIndex, machineIndex);
    man.isBusy = false;
  }
  completeOrderAwait(order, machineIndex) {
    return new Promise((resolve, reject) => {
      const id = this.addOrder(order, machineIndex);
      const CHECK_RATE = 1;
      setInterval(() => {
        const order = this.findOrder(id);
        if (order === null) reject('Cannot find the order');
        const isShipped = order.isShipped;
        if (isShipped) resolve();
      }, 1000 / CHECK_RATE);
    });
  }
  start() {
    const FRAME_RATE = 1;
    this.animation = setInterval(() => {
      this.deliveryLastUnshippedOrder();
    }, 1000 / FRAME_RATE);
  }
}

const container = document.querySelector('.city-container');
const app = new PIXIWrapper(container);

const graph = new Graph(app, graphConfig, true);
const city = new City(app, cityConfig);

const printerManager = new PrinterManager(
  city,
  'printer1',
  'printer2',
  'printer3'
);
printerManager.start();

const deliveryManager = new DeliveryManManager(
  app,
  graph,
  city,
  printerManager,
  2,
  0
);
deliveryManager.start();

async function completeOrder(order) {
  const machineIndex = await printerManager.completeOrderAwait(order);
  await deliveryManager.completeOrderAwait(order, machineIndex);
  return true;
}

const order1 = {
  home: 0,
  completionTime: 1,
  isShipped: false,
  isShipping: false,
};

const order2 = {
  home: 1,
  completionTime: 1,
  isShipped: false,
  isShipping: false,
};

completeOrder(order1);
completeOrder(order2);
completeOrder(order2);
completeOrder(order2);
completeOrder(order2);
