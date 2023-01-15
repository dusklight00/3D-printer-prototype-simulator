import Man from "./man.js";
import BunnySprite from "../sprites/bunny-sprite.js";

export default class DeliveryMan extends Man {
  constructor(app, graph, startingNodeIndex) {
    const startingNodeInfo = graph.getNodeDetails(startingNodeIndex);
    const sprite = new BunnySprite(app, startingNodeInfo.x, startingNodeInfo.y);
    super(app, sprite);
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
    for (let i in shortestPath) {
      const nodeIndex = shortestPath[i];
      await this.moveToNode(nodeIndex);
    }
  }
  hasPackage(status) {
    this.sprite.setNotification(status);
  }
}
