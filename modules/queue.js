import OrderElement from './order-element.js';
import { getIncompleteOrders, getOrders } from './backend-wrapper.js';


export default class Queue {
  constructor() {
    this.QUEUE_CONTAINER = document.querySelector('.queue-container');
    this.orders = [];
  }
  findModelIndexFromCompletionTime(completionTime) {
    if (completionTime == 10) return 0;
    if (completionTime == 20) return 1;
    if (completionTime == 30) return 2;
    if (completionTime == 40) return 3;
    return null;
  }
  render(queueConfig) {
    queueConfig.forEach((config) => {
      const name = config.name;
      const status = config.status;
      const completionTime = config.completionTime;
      const modelIndex = this.findModelIndexFromCompletionTime(completionTime);
      const element = new OrderElement(name, status, modelIndex);
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
      const orders = await getIncompleteOrders();
      this.update(orders);
    }, UPDATE_DELAY);
  }
}
