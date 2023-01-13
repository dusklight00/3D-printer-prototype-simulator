import { drawLine, drawPoint } from "./texture.js";
import { checkArrContainsArr } from "./utils.js";

export default class Graph {
  constructor(graphConfig) {
    this.graphConfig = graphConfig;
  }

  shortestPath(start, end) {
    // Initialize distances, queue and previous node array
    let distances = new Array(this.graphConfig.matrix.length).fill(Infinity);
    let queue = [start];
    let prev = new Array(this.graphConfig.matrix.length).fill(-1);
    distances[start] = 0;

    // Perform breadth-first search
    while (queue.length > 0) {
      let current = queue.shift();
      for (let i = 0; i < this.graphConfig.matrix[current].length; i++) {
        let weight = this.graphConfig.matrix[current][i];
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
    const connectingMatrix = this.graphConfig.matrix[nodeIndex];
    const connectingNodes = [];
    for (let i = 0; i < connectingMatrix.length; i++) {
      const elem = connectingMatrix[i];
      if (elem == 1) connectingNodes.push(i);
    }
    return connectingNodes;
  }

  findConnectingPair() {
    const pairs = [];
    for (let i = 0; i < this.graphConfig.matrix.length; i++) {
      for (let j = 0; j < this.graphConfig.matrix[i].length; j++) {
        const elem = this.graphConfig.matrix[i][j];
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

  render(app) {
    // Rendering Nodes
    this.graphConfig.nodes.forEach((node) => {
      const point = drawPoint(node.x, node.y);
      app.render(point);
    });

    // Rendering Connections
    const pairs = this.findConnectingPair();
    console.log(pairs);
    pairs.forEach((pair) => {
      const nodeOneIndex = pair[0];
      const nodeTwoIndex = pair[1];
      const node1 = this.graphConfig.nodes[nodeOneIndex];
      const node2 = this.graphConfig.nodes[nodeTwoIndex];
      const line = drawLine(node1.x, node1.y, node2.x, node2.y);
      app.render(line);
    });
  }
}
