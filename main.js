import Queue from "./modules/queue.js";

const config = [
  {
    name: "pratul",
    status: "Complete",
  },
  {
    name: "pratul2",
    status: "Complete",
  },
];

const queue = new Queue();
queue.live("something");
