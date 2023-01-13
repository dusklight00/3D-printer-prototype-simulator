import PIXIWrapper from "./pixi-wrapper.js";
import Graph from "./graph.js";
import { graphConfig } from "./data.js";
import DeliveryMan from "./delivery-man.js";

const app = new PIXIWrapper();

const graph = new Graph(graphConfig);
// graph.render(app);
const man = new DeliveryMan(app, graph, 0);
(async function () {
  await man.moveShortestPath(4);
  await man.moveShortestPath(3);
})();
