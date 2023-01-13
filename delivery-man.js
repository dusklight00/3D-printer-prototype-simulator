import Man from "./man.js";

export default class DeliveryMan extends Man {
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
