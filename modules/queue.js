import OrderElement from './order-element.js';
import { getIncompleteOrders, getOrders } from './backend-wrapper.js';

export default class Queue {
  constructor() {
    this.QUEUE_CONTAINER = document.querySelector('.queue-container');
    this.orders = [];
  }
  render(queueConfig) {
    queueConfig.forEach((config) => {
      const name = config.name;
      const status = config.status;
      const element = new OrderElement(name, status);
      this.orders.push(element);
    });
  }
  truncate() {
    this.QUEUE_CONTAINER.innerHTML = '';
  }
  update(queueConfig) {
    this.truncate();
    this.render(queueConfig);
  }
  live() {
    const UPDATE_DELAY = 1000;
    setInterval(async () => {
      const orders = await getOrders();
      this.update(orders);
    }, UPDATE_DELAY);
  }
}
