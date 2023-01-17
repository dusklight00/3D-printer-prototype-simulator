import Man from './man.js';
import BunnySprite from '../sprites/bunny-sprite.js';

export default class DeliveryMan extends Man {
  constructor(app, graph, city, printers, startingNodeIndex) {
    const startingNodeInfo = graph.getNodeDetails(startingNodeIndex);
    const sprite = new BunnySprite(app, startingNodeInfo.x, startingNodeInfo.y);
    super(app, sprite);
    this.graph = graph;
    this.city = city;
    this.printers = printers;
    this.currentNode = startingNodeIndex;
    this.hasPackageStatus = false;
  }

  async moveToNode(nodeIndex) {
    const nodeInfo = this.graph.getNodeDetails(nodeIndex);
    await this.move(nodeInfo.x, nodeInfo.y);
    this.currentNode = nodeIndex;
  }

  async giveAndCome(x, y, changeStatus, machineIndex = null) {
    const returnLocation = {
      x: this.coord.x,
      y: this.coord.y,
    };
    console.log(machineIndex);
    await this.move(x, y);
    if (changeStatus) this.toggleHasPackageStatus();
    if (machineIndex !== null)
      this.city.setMachineNotification(machineIndex, false);
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
    this.hasPackageStatus = status;
    this.sprite.setNotification(this.hasPackageStatus);
  }

  toggleHasPackageStatus() {
    this.hasPackageStatus = !this.hasPackageStatus;
    this.hasPackage(this.hasPackageStatus);
  }

  async completeOrder(order) {
    const machineIndex = order.machine;
    const homeIndex = order.home;
    const completionTime = order.completionTime;

    const machineConnectingNodeIndex =
      this.graph.getMachineConnectingNode(machineIndex);
    const homeConnectingNodeIndex = this.graph.getHomeConnectingNode(homeIndex);

    const homeNode = this.graph.getHomeNode(homeIndex);
    const machineNode = this.graph.getMachineNode(machineIndex);

    this.city.setMachineNotification(machineIndex, true);
    await this.moveShortestPath(machineConnectingNodeIndex);
    await this.giveAndCome(machineNode.x, machineNode.y, true, machineIndex);

    await this.moveShortestPath(homeConnectingNodeIndex);
    await this.moveShortestPath(homeConnectingNodeIndex);
    await this.giveAndCome(homeNode.x, homeNode.y, true);
  }
}
