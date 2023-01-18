import PIXIWrapper from '../wrappers/pixi-wrapper.js';
import PrinterManager from './printer-manager.js';
import City from './city.js';
import Graph from './graph.js';
import { cityConfig, graphConfig } from '../data.js';
import DeliveryManManager from './delivery-man-manager.js';

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
  const machineIndex = await printerManager.completeOrderAwait(order);
  await deliveryManager.completeOrderAwait(order, machineIndex);
  return true;
}
