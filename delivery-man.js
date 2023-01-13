import Man from "./man.js";

export default class DeliveryMan extends Man {
  constructor(app, graph, startingNodeIndex) {
    const startingNodeInfo = graph.getNodeDetails(startingNodeIndex);
    super(app, startingNodeInfo.x, startingNodeInfo.y);
    this.graph = graph;
    this.currentNode = startingNodeIndex;
  }
  async moveToNode(nodeIndex) {
    const nodeInfo = this.graph.getNodeDetails(nodeIndex);
    await this.move(nodeInfo.x, nodeInfo.y);
    this.currentNode = nodeIndex;
  }
  async giveAndCome(x, y) {
    const returnLocation = {
      x: this.coord.x,
      y: this.coord.y,
    };
    await this.move(x, y);
    await this.move(returnLocation.x, returnLocation.y);
  }
  async moveShortestPath(targetNodeIndex) {
    const shortestPath = this.graph.shortestPath(
      this.currentNode,
      targetNodeIndex
    );
    await this.moveToNode(0);
    await this.moveToNode(1);
    // shortestPath.forEach(async (nodeIndex) => {
    //   await this.moveToNode(nodeIndex);
    // });
  }
}
