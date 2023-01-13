import PIXIWrapper from "./pixi-wrapper.js";
import { drawSprite } from "./texture.js";

const app = new PIXIWrapper();

const bunny = drawSprite(
  "bunny.png",
  app.instance.screen.width / 2,
  app.instance.screen.height / 2
);

app.render(bunny);

console.log(bunny.x, bunny.y);

// bunny.rotation = Math.PI;
