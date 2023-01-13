import PIXIWrapper from "./pixi-wrapper.js";
import { Man } from "./man.js";
import Graph from "./graph.js";
import { graphConfig } from "./data.js";

const app = new PIXIWrapper();

class DeliveryMan extends Man {
  constructor(app, graph, startingNodeIndex) {
    const startingNodeInfo = graph.getNodeDetails(startingNodeIndex);
    super(app, startingNodeInfo.x, startingNodeInfo.y);
    this.graph = graph;
  }
  async moveToNode(nodeIndex) {
    const nodeInfo = graph.getNodeDetails(nodeIndex);
    await this.move(nodeInfo.x, nodeInfo.y);
  }
}

const graph = new Graph(graphConfig);
const man = new DeliveryMan(app, graph, 0);

graph.render(app);

(async function () {
  await man.moveToNode(1);
  await man.moveToNode(2);
  await man.moveToNode(3);
  await man.moveToNode(4);
})();
