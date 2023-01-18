import PIXIWrapper from './wrappers/pixi-wrapper.js';
import { graphConfig } from './data.js';
import DeliveryMan from './models/delivery-man.js';
import Graph from './models/graph.js';

const app = new PIXIWrapper();
const graph = new Graph(graphConfig);
graph.render(app);
const man = new DeliveryMan(app, graph, 0);
(async function () {
  man.hasPackage(false);
  await man.moveShortestPath(3);
  man.hasPackage(true);
  await man.moveShortestPath(0);
  man.hasPackage(false);
})();

{
  /* <div class="printer complete" id="printer1">
    <div class="top"></div>
    <div class="middle">
      <div class="stand"></div>
      <div class="air">
        <div class="tool-container">
          <div class="arm"></div>
          <div class="point"></div>
        </div>
        <div class="workpiece"></div>
      </div>
    </div>
    <div class="base"></div>
  </div> */
}

import Queue from './modules/queue.js';

const config = [
  {
    name: 'pratul',
    status: 'Complete',
  },
  {
    name: 'pratul2',
    status: 'Complete',
  },
];

// const queue = new Queue();
// queue.live();

// const order = {
//   machine: 0,
//   home: 0,
// };
// const graph = new Graph(graphConfig);
// graph.render(app);

// const man = new DeliveryMan(app, graph, 0);
// man.completeOrder(order);

// const printer = new Printer("printer1");
// printer.completeWork(10);

// export const city = [
//   {
//     x: 70,
//     y: 80,
//     width: 80,
//     height: 90,
//   },
//   {
//     x: 70,
//     y: 220,
//     width: 80,
//     height: 100,
//   },
//   {
//     x: 70,
//     y: 360,
//     width: 80,
//     height: 70,
//   },
//   {
//     x: 225,
//     y: 500,
//     width: 400,
//     height: 100,
//   },
//   {
//     x: 300,
//     y: 153,
//     width: 240,
//     height: 237,
//   },
//   {
//     x: 300,
//     y: 360,
//     width: 250,
//     height: 70,
//   },
//   {
//     x: 610,
//     y: 155,
//     width: 250,
//     height: 237,
//   },
//   {
//     x: 610,
//     y: 336,
//     width: 250,
//     height: 120,
//   },
//   {
//     x: 610,
//     y: 500,
//     width: 250,
//     height: 100,
//   },
// ];

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
