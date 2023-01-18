import {
  addOrder,
  getIncompleteOrders,
  getOrders,
} from './modules/backend-wrapper.js';
import completeOrder from './modules/controller.js';
import Queue from './modules/queue.js';

const queue = new Queue();
queue.live();

(async function () {
  await addOrder('pratul', 4, 0);
  const result = await getIncompleteOrders();
  await completeOrder(result[0]);
  console.log(await getIncompleteOrders());
})();
