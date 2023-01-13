import { graphConfig } from "./data.js";
import DeliveryMan from "./models/delivery-man.js";
import Graph from "./models/graph.js";
import PIXIWrapper from "./wrappers/pixi-wrapper.js";

const app = new PIXIWrapper();

const graph = new Graph(graphConfig);
const man = new DeliveryMan(app, graph, 0, "./assets/bunny.png");
man.giveAndCome(50, 50);
