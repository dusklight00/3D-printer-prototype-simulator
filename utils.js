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

function checkTwoArrEquality(arr1, arr2) {
  if (arr1.length != arr2.length) return false;
  for (let i in arr1) {
    const elem1 = arr1[i];
    const elem2 = arr2[i];
    if (elem1 !== elem2) return false;
  }
  return true;
}

export function checkArrContainsArr(arr, testArr) {
  for (let i in arr) {
    const row = arr[i];
    if (checkTwoArrEquality(row, testArr)) return true;
  }
  return false;
}

export function findDistanceBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function findAngleMadeByTwoPoints(x1, y1, x2, y2) {
  if (x2 >= x1 && y2 <= y1) return Math.atan((x2 - x1) / (y1 - y2));
  if (x2 <= x1 && y2 <= y1) return Math.PI - Math.atan((y1 - y2) / (x1 - x2));
  if (x2 <= x1 && y2 >= y1)
    return (3 * Math.PI) / 2 - Math.atan((x1 - x2) / (y2 - y1));
  if (x2 >= x1 && y2 >= y1) {
    // alert((3 * Math.PI) / 2 + Math.atan((x2 - x1) / (y2 - y1)));
    return (3 * Math.PI) / 2 + Math.atan((x2 - x1) / (y2 - y1));
  }
}

export function findComponents(magnitude, angle) {
  if (angle <= Math.PI / 2) {
    const acuteAngle = angle;
    return {
      x: magnitude * Math.cos(acuteAngle),
      y: -1 * magnitude * Math.sin(acuteAngle),
    };
  }
  if (angle > Math.PI / 2 && angle <= Math.PI) {
    const acuteAngle = Math.PI - angle;
    return {
      x: -1 * magnitude * Math.cos(acuteAngle),
      y: -1 * magnitude * Math.sin(acuteAngle),
    };
  }
  if (angle > Math.PI && angle <= (3 * Math.PI) / 2) {
    const acuteAngle = (3 * Math.PI) / 2 - angle;
    return {
      x: -1 * magnitude * Math.sin(acuteAngle),
      y: magnitude * Math.cos(acuteAngle),
    };
  }
  if (angle > (3 * Math.PI) / 2 && angle <= 2 * Math.PI) {
    const acuteAngle = angle - (3 * Math.PI) / 2;
    return {
      x: magnitude * Math.sin(acuteAngle),
      y: magnitude * Math.cos(acuteAngle),
    };
  }
  return new Error("Angle is greater than 2 * Math.PI");
}

export function convertRadianToDegree(angle) {
  return angle * (180 / Math.PI);
}
