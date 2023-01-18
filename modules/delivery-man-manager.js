import DeliveryMan from './delivery-man.js';
import { generateUUID } from '../utility/utils.js';

export default class DeliveryManManager {
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
      ...order,
      internalID: id,
      machine: machineIndex,
    });
    return id;
  }

  findOrder(id) {
    for (let i in this.queue) {
      const order = this.queue[i];
      if (order.internalID === id) return order;
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
    order.isShipped = true;
  }
  completeOrderAwait(order, machineIndex) {
    return new Promise((resolve, reject) => {
      const id = this.addOrder(order, machineIndex);
      const CHECK_RATE = 1;
      setInterval(() => {
        const deliveryOrder = this.findOrder(id);
        if (deliveryOrder === null) reject('Cannot find the order');
        const isShipped = deliveryOrder.isShipped;
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
