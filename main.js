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
