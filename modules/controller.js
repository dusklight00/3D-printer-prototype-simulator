import PIXIWrapper from '../wrappers/pixi-wrapper.js';
import PrinterManager from './printer-manager.js';
import City from './city.js';
import Graph from './graph.js';
import { cityConfig, graphConfig } from '../data.js';
import DeliveryManManager from './delivery-man-manager.js';
import {
  getIncompleteOrders,
  getOrders,
  setCompleteOrder,
  setProcessOrder,
} from './backend-wrapper.js';

// export default class Controller {
//   constructor() {
//     this.container = document.querySelector('.city-container');
//     this.app = new PIXIWrapper(container);
//     this.graph = new Graph(this.app, graphConfig, true);
//     this.city = new City(this.app, cityConfig);

//     this.printerManager = new PrinterManager(
//       city,
//       'printer1',
//       'printer2',
//       'printer3'
//     );
//     this.printerManager.start();

//     this.deliveryManager = new DeliveryManManager(
//       app,
//       graph,
//       city,
//       printerManager,
//       2,
//       0
//     );
//     this.deliveryManager.start();
//   }
//   async completeOrder(order) {
//     const newOrder = {
//       isShipped: false,
//       isShipping: false,
//       ...order,
//     };

//     const machineIndex = await this.printerManager.completeOrderAwait(newOrder);
//     await deliveryManager.completeOrderAwait(newOrder, machineIndex);
//     await setCompleteOrder(order.id);
//     return true;
//   }
//   async live() {
//     let isPreviousIterationComplete = true;
//     const FRAME_RATE = 1;
//     setInterval(async () => {
//       isPreviousIterationComplete = false;
//       const orders = await getIncompleteOrders();
//       orders.forEach(async (order) => {
//         await this.completeOrder(order);
//       });
//       isPreviousIterationComplete = false;
//     }, 1000 / FRAME_RATE);
//   }
// }

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

export default async function completeOrder(order) {
  const newOrder = {
    isShipped: false,
    isShipping: false,
    ...order,
  };
  await setProcessOrder(order.id);
  const machineIndex = await printerManager.completeOrderAwait(newOrder);
  await deliveryManager.completeOrderAwait(newOrder, machineIndex);
  await setCompleteOrder(order.id);
  return true;
}
