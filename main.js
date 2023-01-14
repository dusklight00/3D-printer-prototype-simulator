import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import { graphConfig } from "./data.js";
import DeliveryMan from "./models/delivery-man.js";
import Graph from "./models/graph.js";

const app = new PIXIWrapper();
const graph = new Graph(graphConfig);
graph.render(app);
const man = new DeliveryMan(app, graph, 0);
man.moveShortestPath(3);
