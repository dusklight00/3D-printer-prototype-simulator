export function drawSquare(x, y, width, height) {
  const graphic = new PIXI.Graphics();
  graphic.beginFill(0xcccccc);
  graphic.lineStyle(3, 0x0099ff, 1);
  graphic.moveTo(x - width / 2, y - height / 2);
  graphic.lineTo(x + width / 2, y - height / 2);
  graphic.lineTo(x + width / 2, y + height / 2);
  graphic.lineTo(x - width / 2, y + height / 2);
  graphic.lineTo(x - width / 2, y - height / 2);
  graphic.closePath();
  graphic.endFill();
  return graphic;
}

export function drawAnchorDownSquare(x, y, width, height) {
  const centerX = x;
  const centerY = y - height / 2;
  const square = drawSquare(centerX, centerY, width, height);
  return square;
}

export function drawCircle(x, y, radius, stroke, fill) {
  const circle = new PIXI.Graphics();
  circle.lineStyle(2, stroke);
  circle.beginFill(fill);
  circle.drawCircle(x, y, radius);
  circle.endFill();
  return circle;
}

export function drawPoint(x, y) {
  const DEFAULT_POINT_RADIUS = 1;
  const DEFAULT_POINT_FILL_COLOR = 0xffffff;
  const DEFAULT_POINT_STROKE_COLOR = 0xffffff;
  const point = drawCircle(
    x,
    y,
    DEFAULT_POINT_RADIUS,
    DEFAULT_POINT_STROKE_COLOR,
    DEFAULT_POINT_FILL_COLOR
  );
  return point;
}

export function drawLine(x1, y1, x2, y2) {
  const DEFAULT_LINE_FILL_COLOR = 0xffffff;
  const DEFAULT_LINE_THICKNESS = 1;
  const graphics = new PIXI.Graphics();
  graphics.lineStyle(DEFAULT_LINE_THICKNESS, DEFAULT_LINE_FILL_COLOR, 1);
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.closePath();
  return graphics;
}

export function drawSprite(imageURL, x, y) {
  const sprite = PIXI.Sprite.from(imageURL);
  sprite.anchor.set(0.5);
  sprite.x = x;
  sprite.y = y;
  return sprite;
}
