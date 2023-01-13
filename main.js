import PIXIWrapper from "./pixi-wrapper.js";
import { Man } from "./man.js";
import Graph from "./graph.js";
import { graphConfig } from "./data.js";
import { drawPoint } from "./texture.js";

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
  async giveAndCome(x, y) {
    const returnLocation = {
      x: this.coord.x,
      y: this.coord.y,
    };
    await this.move(x, y);
    await this.move(returnLocation.x, returnLocation.y);
  }
}

const graph = new Graph(graphConfig);
graph.render(app);
const man = new DeliveryMan(app, graph, 0);
(async function () {
  await man.giveAndCome(100, 100);
})();
