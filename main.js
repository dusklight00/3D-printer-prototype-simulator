import { graphConfig } from "./data.js";
import DeliveryMan from "./delivery-man.js";
import Graph from "./graph.js";
import PIXIWrapper from "./pixi-wrapper.js";

const app = new PIXIWrapper();

const graph = new Graph(graphConfig);
const man = new DeliveryMan(app, graph, 0, "bunny.png");
man.giveAndCome(50, 50);
