export default class Printer {
  constructor(printerID) {
    this.printer = document.getElementById(printerID);
  }
  start() {
    this.animation = setInterval(() => {
      this.printer.classList.toggle("complete");
    }, 1000);
  }
  complete() {
    clearInterval(this.animation);
    this.printer.classList = "printer complete";
  }
  clear() {
    this.printer.classList = "printer complete clear";
  }
}
