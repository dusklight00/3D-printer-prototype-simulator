import { drawAnchorDownSquare } from "./utility/texture.js";
import PIXIWrapper from "./wrappers/pixi-wrapper.js";

const app = new PIXIWrapper();
const square = drawAnchorDownSquare(200, 200, 100, 50);

app.render(square);
