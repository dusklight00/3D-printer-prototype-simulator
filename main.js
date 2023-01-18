import { addOrder, getOrders } from './modules/backend-wrapper.js';
import completeOrder from './modules/controller.js';

(async function () {
  // await addOrder('pratul', 4, 0);
  const result = await getOrders();
  const order = {
    home: 1,
    completionTime: 4,
  };
  completeOrder(result[0]);
})();
