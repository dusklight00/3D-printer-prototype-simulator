export const graphConfig = {
  machines: [
    { x: 200, y: 200, connectingNode: 2 },
    { x: 300, y: 400, connectingNode: 4 },
    { x: 300, y: 100, connectingNode: 3 },
  ],
  homes: [
    {
      x: 50,
      y: 50,
      connectingNode: 0,
    },
  ],
  nodes: [
    {
      index: 0,
      x: 100,
      y: 200,
    },
    {
      index: 1,
      x: 200,
      y: 100,
    },
    {
      index: 2,
      x: 300,
      y: 200,
    },
    {
      index: 3,
      x: 400,
      y: 100,
    },
    {
      index: 4,
      x: 200,
      y: 300,
    },
  ],
  matrix: [
    [0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
};

export const cityConfig = {
  homes: [
    {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      label: '1',
    },
  ],
  buildings: [
    // {
    //   x: 300,
    //   y: 100,
    //   width: 100,
    //   height: 100,
    // },
  ],
  machines: [
    {
      index: 0,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      label: '1',
    },
    {
      x: 300,
      y: 400,
      width: 100,
      height: 100,
      label: '2',
    },
    {
      x: 300,
      y: 100,
      width: 100,
      height: 100,
      label: '3',
    },
  ],
};
