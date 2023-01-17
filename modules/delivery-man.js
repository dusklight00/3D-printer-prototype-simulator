import Man from "./man.js";
import BunnySprite from "../sprites/bunny-sprite.js";

export default class DeliveryMan extends Man {
  constructor(app, graph, startingNodeIndex) {
    const startingNodeInfo = graph.getNodeDetails(startingNodeIndex);
    const sprite = new BunnySprite(app, startingNodeInfo.x, startingNodeInfo.y);
    super(app, sprite);
    this.graph = graph;
    this.currentNode = startingNodeIndex;
    this.hasPackageStatus = false;
  }

  async moveToNode(nodeIndex) {
    const nodeInfo = this.graph.getNodeDetails(nodeIndex);
    await this.move(nodeInfo.x, nodeInfo.y);
    this.currentNode = nodeIndex;
  }

  async giveAndCome(x, y, changeStatus) {
    const returnLocation = {
      x: this.coord.x,
      y: this.coord.y,
    };
    await this.move(x, y);
    if (changeStatus) this.toggleHasPackageStatus();
    await this.move(returnLocation.x, returnLocation.y);
  }

  async moveShortestPath(targetNode) {
    const index = targetNode.index;
    const shortestPath = this.graph.shortestPath(this.currentNode, index);
    for (let i in shortestPath) {
      const nodeIndex = shortestPath[i];
      await this.moveToNode(nodeIndex);
    }
  }

  hasPackage(status) {
    this.hasPackageStatus = status;
    this.sprite.setNotification(this.hasPackageStatus);
  }

  toggleHasPackageStatus() {
    this.hasPackageStatus = !this.hasPackageStatus;
    this.hasPackage(this.hasPackageStatus);
  }

  async completeOrder(order) {
    const machineNodeIndex = order.machine;
    const homeNodeIndex = order.home;
    const machineNode = this.graph.config.machines[machineNodeIndex];
    const homeNode = this.graph.config.homes[homeNodeIndex];

    const machineConnectingNodeIndex = machineNode.connectingNode;
    const homeConnectingNodeIndex = homeNode.connectingNode;
    const machineConnectingNode =
      this.graph.config.nodes[machineConnectingNodeIndex];
    const homeConnectingNode = this.graph.config.nodes[homeConnectingNodeIndex];

    await this.moveShortestPath(machineConnectingNode);
    await this.giveAndCome(machineNode.x, machineNode.y, true);
    await this.moveShortestPath(homeConnectingNode);
    await this.giveAndCome(homeNode.x, homeNode.y, true);
  }
}
