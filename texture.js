export function drawSquare(x, y, width, height) {
  const graphic = new PIXI.Graphics();
  graphic.beginFill(0xff3300);
  graphic.lineStyle(10, 0xffd900, 1);
  graphic.moveTo(x - width / 2, y - height / 2);
  graphic.lineTo(x + width / 2, y - height / 2);
  graphic.lineTo(x + width / 2, y + height / 2);
  graphic.lineTo(x - width / 2, y + height / 2);
  graphic.lineTo(x - width / 2, y - height / 2);
  graphic.closePath();
  graphic.endFill();
  return graphic;
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
