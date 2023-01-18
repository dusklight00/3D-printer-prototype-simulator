import Printer from './printer.js';
import { generateUUID } from '../utility/utils.js';

export default class PrinterManager {
  constructor(city, ...printerIDs) {
    this.city = city;
    this.printers = [];
    this.queue = [];
    printerIDs.forEach((id) => {
      const printer = new Printer(id);
      this.printers.push({
        id: id,
        object: printer,
        isDockFree: true,
        isPrinterFree: true,
      });
    });
  }
  addOrder(order) {
    const id = generateUUID();
    this.queue.push({
      id: id,
      order: order,
      isComplete: false,
      isProcessing: false,
      isTaken: false,
      allocatedPrinter: null,
    });
    return id;
  }
  collectItem(id) {
    const order = this.getOrderDetail(id);
    const allocatedPrinterIndex = order.allocatedPrinter;
    const printer = this.printers[allocatedPrinterIndex].object;
    printer.undock();
    this.city.setMachineNotification(allocatedPrinterIndex, false);
    order.isTaken = true;
  }
  getOrderDetail(id) {
    for (let i in this.queue) {
      const order = this.queue[i];
      if (order.id == id) return order;
    }
    return null;
  }
  getPrinter(id) {
    for (let i in this.printers) {
      const printer = this.printers[i];
      if (printer.id == id) return printer;
    }
    return null;
  }
  isOrderComplete(id) {
    const order = this.getOrderDetail(id);
    if (order === null) return null;
    return order.isComplete;
  }
  isOrderProcessing(id) {
    const order = this.getOrderDetail(id);
    if (order === null) return null;
    return order.isProcessing;
  }
  isDockFree(id) {
    const printer = getPrinter(id);
    if (printer === null) return null;
    return printer.isDockFree;
  }
  undockPrinter(printerIndex) {
    // console.log(this.printers);
    const printer = this.printers[printerIndex].object;
    printer.undock();
  }
  getIncompleteOrderIndex() {
    for (let i in this.queue) {
      const order = this.queue[i];
      const id = order.id;
      const isOrderComplete = this.isOrderComplete(id);
      const isOrderProcessing = this.isOrderProcessing(id);
      if (isOrderComplete) continue;
      if (isOrderProcessing) continue;
      return i;
    }
    return null;
  }
  getFreePrinterIndex() {
    for (let i in this.printers) {
      const printer = this.printers[i];
      const isPrinterFree = printer.isPrinterFree;
      const isDockFree = printer.isDockFree;
      if (isPrinterFree && isDockFree) return i;
    }
    return null;
  }
  getUntakenPrintedItems() {
    const orders = [];
    this.queue.forEach((order) => {
      if (!order.isComplete) return;
      if (order.isTaken) return;
      orders.push(order);
    });
    return orders;
  }
  async assignWork(printerIndex, orderIndex) {
    const printerConfig = this.printers[printerIndex];
    const printer = printerConfig.object;
    const order = this.queue[orderIndex].order;
    const queue = this.queue[orderIndex];

    queue.printerAllocated = printerIndex;
    printerConfig.isPrinterFree = false;
    printerConfig.isDockFree = false;
    queue.isProcessing = true;

    const completionTime = order.completionTime;
    await printer.completeWork(completionTime);
    this.city.setMachineNotification(printerIndex, true);

    printerConfig.isPrinterFree = true;

    queue.isProcessing = false;
    queue.isComplete = true;
  }
  async assignWorkToFreePrinter() {
    const freePrinterIndex = this.getFreePrinterIndex();
    const orderIndex = this.getIncompleteOrderIndex();

    if (freePrinterIndex == null) return false;
    if (orderIndex == null) return false;

    const order = this.queue[orderIndex];
    order.printerAllocated = freePrinterIndex;

    await this.assignWork(freePrinterIndex, orderIndex);
    return true;
  }
  completeOrderAwait(order) {
    return new Promise((resolve, reject) => {
      const id = this.addOrder(order);
      const queueOrder = this.getOrderDetail(id);
      const CHECK_RATE = 1;
      setInterval(() => {
        const isComplete = this.isOrderComplete(id);
        if (isComplete) resolve(queueOrder.printerAllocated);
      }, 1000 / CHECK_RATE);
    });
  }
  start() {
    const FRAME_RATE = 1;
    this.animation = setInterval(() => {
      this.assignWorkToFreePrinter();
    }, 1000 / FRAME_RATE);
  }
}
