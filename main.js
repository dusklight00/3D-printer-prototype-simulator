import {
  addOrder,
  getIncompleteOrders,
  getOrders,
} from './modules/backend-wrapper.js';
import completeOrder from './modules/controller.js';
import Queue from './modules/queue.js';

const queue = new Queue();
queue.live();

let isLastIterationComplete = true;

setInterval(async () => {
  if (isLastIterationComplete) {
    isLastIterationComplete = false;
    const orders = await getIncompleteOrders();
    const promises = [];
    orders.forEach((order) => {
      promises.push(completeOrder(order));
    });
    await Promise.all(promises);
    isLastIterationComplete = true;
  }
}, 1000);

// (async function () {
//   await addOrder('pratul', 4, 0);
//   const result = await getIncompleteOrders();
//   await completeOrder(result[0]);
//   console.log(await getIncompleteOrders());
// })();
