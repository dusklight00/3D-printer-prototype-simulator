import { drawLine, drawPoint } from '../utility/texture.js';
import { checkArrContainsArr } from '../utility/utils.js';

export default class Graph {
  constructor(app, graphConfig, isRender = false) {
    this.app = app;
    this.config = graphConfig;
    if (isRender) this.render();
  }

  getMachineConnectingNode(machineIndex) {
    const machine = this.config.machines[machineIndex];
    return machine.connectingNode;
  }

  getHomeConnectingNode(homeIndex) {
    const home = this.config.homes[homeIndex];
    return home.connectingNode;
  }

  getMachineNode(index) {
    const machine = this.config.machines[index];
    return machine;
  }

  getHomeNode(index) {
    const home = this.config.homes[index];
    return home;
  }

  getNodeDetails(nodeIndex) {
    const node = this.config.nodes[nodeIndex];
    return {
      x: node.x,
      y: node.y,
    };
  }

  shortestPath(start, end) {
    // Initialize distances, queue and previous node array
    let distances = new Array(this.config.matrix.length).fill(Infinity);
    let queue = [start];
    let prev = new Array(this.config.matrix.length).fill(-1);
    distances[start] = 0;

    // Perform breadth-first search
    while (queue.length > 0) {
      let current = queue.shift();
      for (let i = 0; i < this.config.matrix[current].length; i++) {
        let weight = this.config.matrix[current][i];
        if (weight === 0) continue;
        if (distances[i] === Infinity) {
          distances[i] = distances[current] + weight;
          prev[i] = current;
          queue.push(i);
        }
      }
    }

    // Create the path by tracing the previous nodes
    let path = [end];
    let current = end;
    while (current !== start) {
      current = prev[current];
      path.unshift(current);
    }

    // Return the shortest path
    return path;
  }

  findConnectingNodes(nodeIndex) {
    const connectingMatrix = this.config.matrix[nodeIndex];
    const connectingNodes = [];
    for (let i = 0; i < connectingMatrix.length; i++) {
      const elem = connectingMatrix[i];
      if (elem == 1) connectingNodes.push(i);
    }
    return connectingNodes;
  }

  findConnectingPair() {
    const pairs = [];
    for (let i = 0; i < this.config.matrix.length; i++) {
      for (let j = 0; j < this.config.matrix[i].length; j++) {
        const elem = this.config.matrix[i][j];
        if (elem == 1)
          if (
            !(
              checkArrContainsArr(pairs, [i, j]) ||
              checkArrContainsArr(pairs, [j, i])
            )
          )
            pairs.push([i, j]);
      }
    }
    return pairs;
  }

  render() {
    const RED_COLOR = 0xff0000;
    const BLUE_COLOR = 0x0099ff;

    // Rendering Home
    this.config.homes.forEach((home) => {
      const point = drawPoint(home.x, home.y, RED_COLOR);
      this.app.render(point);
    });

    // Rendering Machines
    this.config.machines.forEach((machine) => {
      const point = drawPoint(machine.x, machine.y, BLUE_COLOR);
      this.app.render(point);
    });

    // Rendering Nodes
    this.config.nodes.forEach((node) => {
      const point = drawPoint(node.x, node.y);
      this.app.render(point);
    });

    // Rendering Node Connections
    const pairs = this.findConnectingPair();
    pairs.forEach((pair) => {
      const nodeOneIndex = pair[0];
      const nodeTwoIndex = pair[1];
      const node1 = this.config.nodes[nodeOneIndex];
      const node2 = this.config.nodes[nodeTwoIndex];
      const line = drawLine(node1.x, node1.y, node2.x, node2.y);
      this.app.render(line);
    });

    // Rendering Home Connections
    this.config.homes.forEach((home) => {
      const connectingNodeIndex = home.connectingNode;
      const connectingNode = this.config.nodes[connectingNodeIndex];
      const line = drawLine(
        home.x,
        home.y,
        connectingNode.x,
        connectingNode.y,
        RED_COLOR
      );
      this.app.render(line);
    });

    // Rending Machine Connections
    this.config.machines.forEach((machine) => {
      const connectingNodeIndex = machine.connectingNode;
      const connectingNode = this.config.nodes[connectingNodeIndex];
      const line = drawLine(
        machine.x,
        machine.y,
        connectingNode.x,
        connectingNode.y,
        BLUE_COLOR
      );
      this.app.render(line);
    });
  }
}
