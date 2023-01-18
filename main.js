import completeOrder from './modules/controller.js';

const order1 = {
  home: 0,
  completionTime: 1,
};

const order2 = {
  home: 1,
  completionTime: 4,
};

completeOrder(order1);
completeOrder(order2);
completeOrder(order1);
completeOrder(order2);
completeOrder(order1);
