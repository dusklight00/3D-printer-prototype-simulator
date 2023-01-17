import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import { graphConfig } from "./data.js";
import DeliveryMan from "./models/delivery-man.js";
import Graph from "./models/graph.js";

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

import Queue from "./modules/queue.js";

const config = [
  {
    name: "pratul",
    status: "Complete",
  },
  {
    name: "pratul2",
    status: "Complete",
  },
];

const queue = new Queue();
queue.live();
