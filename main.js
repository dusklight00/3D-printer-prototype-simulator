import PIXIWrapper from "./wrappers/pixi-wrapper.js";
import BunnySprite from "./sprites/bunny-sprite.js";

const app = new PIXIWrapper();
const man = new BunnySprite(app, 100, 100);
man.setNotification(true);
