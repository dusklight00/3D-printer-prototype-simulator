import {
  addOrder,
  getIncompleteOrders,
  getOrders,
} from './modules/backend-wrapper.js';
import completeOrder from './modules/controller.js';

(async function () {
  await addOrder('pratul', 4, 0);
  const result = await getIncompleteOrders();
  await completeOrder(result[0]);
  console.log(await getIncompleteOrders());
})();
