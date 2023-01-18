export const graphConfig = {
  machines: [
    { x: 300, y: 330, connectingNode: 8 },
    { x: 150, y: 450, connectingNode: 3 },
    { x: 500, y: 150, connectingNode: 6 },
  ],
  homes: [
    {
      x: 100,
      y: 90,
      connectingNode: 10,
    },
    {
      x: 550,
      y: 450,
      connectingNode: 2,
    },
  ],
  nodes: [
    {
      index: 0,
      x: 455,
      y: 600,
    },
    {
      index: 1,
      x: 455,
      y: 420,
    },
    {
      index: 2,
      x: 550,
      y: 420,
    },
    {
      index: 3,
      x: 150,
      y: 420,
    },
    {
      index: 4,
      x: 150,
      y: 360,
    },
    {
      index: 5,
      x: 455,
      y: 300,
    },
    {
      index: 6,
      x: 455,
      y: 150,
    },
    {
      index: 7,
      x: 150,
      y: 300,
    },
    {
      index: 8,
      x: 300,
      y: 300,
    },
    {
      index: 9,
      x: 150,
      y: 200,
    },
    {
      index: 10,
      x: 150,
      y: 90,
    },
  ],
  matrix: [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  ],
};

export const cityConfig = {
  homes: [
    {
      x: 85,
      y: 90,
      width: 100,
      height: 100,
      label: '1',
    },
    {
      x: 550,
      y: 475,
      width: 100,
      height: 100,
      label: '2',
    },
  ],
  buildings: [
    {
      x: 70,
      y: 80,
      width: 80,
      height: 90,
    },
    {
      x: 70,
      y: 220,
      width: 80,
      height: 100,
    },
    {
      x: 70,
      y: 360,
      width: 80,
      height: 70,
    },
    {
      x: 225,
      y: 500,
      width: 400,
      height: 100,
    },
    {
      x: 300,
      y: 153,
      width: 240,
      height: 237,
    },
    {
      x: 300,
      y: 360,
      width: 250,
      height: 70,
    },
    {
      x: 560,
      y: 155,
      width: 150,
      height: 237,
    },
    {
      x: 560,
      y: 336,
      width: 150,
      height: 120,
    },
    {
      x: 560,
      y: 500,
      width: 150,
      height: 100,
    },
  ],
  machines: [
    {
      index: 0,
      x: 300,
      y: 350,
      width: 100,
      height: 100,
      label: '1',
    },
    {
      x: 150,
      y: 475,
      width: 100,
      height: 100,
      label: '2',
    },
    {
      x: 510,
      y: 150,
      width: 100,
      height: 100,
      label: '3',
    },
  ],
};
