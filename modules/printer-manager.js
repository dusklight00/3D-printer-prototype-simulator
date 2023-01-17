export default class PrinterManager {
  constructor(printerIDs) {
    this.printers = [];
    printerIDs.forEach((id) => {
      const printer = new Printer(id);
      this.printers.push(printer);
    });
  }
  async assignPrinterWork(index, completionTime) {
    const printer = this.printers[index];
    await printer.compeleteWork(completionTime);
  }
}
