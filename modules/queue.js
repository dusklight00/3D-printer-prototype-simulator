import OrderElement from "./order-element.js";

export default class Queue {
  constructor(queueConfig) {
    this.QUEUE_CONTAINER = document.querySelector(".queue-container");
    this.orders = [];
    this.renderQueue(queueConfig);
  }
  renderQueue(queueConfig) {
    queueConfig.forEach((config) => {
      const name = config.name;
      const status = config.status;
      const element = new OrderElement(name, status);
      this.orders.push(element);
    });
  }
  truncateQueue() {
    this.orders.forEach((orderElem) => {
      this.QUEUE_CONTAINER.removeChild(orderElem);
    });
  }
  updateQueue(queueConfig) {
    this.truncateQueue();
    this.renderQueue(queueConfig);
  }
}
