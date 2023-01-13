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
    console.log(returnLocation);
    await this.move(50, 50);
    await this.move(200, 100);
    console.log(returnLocation);
  }
}

const man = new Man(app, 50, 50);

const point1 = drawPoint(100, 200);
const point2 = drawPoint(200, 100);
const point3 = drawPoint(50, 50);
app.render(point1, point2, point3);

(async function () {
  // await man.move(50, 50);
  await man.move(100, 200);
})();
