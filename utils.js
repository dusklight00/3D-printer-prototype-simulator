export function shortestPath(adjMatrix, start, end) {
  // Initialize distances, queue and previous node array
  let distances = new Array(adjMatrix.length).fill(Infinity);
  let queue = [start];
  let prev = new Array(adjMatrix.length).fill(-1);
  distances[start] = 0;

  // Perform breadth-first search
  while (queue.length > 0) {
    let current = queue.shift();
    for (let i = 0; i < adjMatrix[current].length; i++) {
      let weight = adjMatrix[current][i];
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
