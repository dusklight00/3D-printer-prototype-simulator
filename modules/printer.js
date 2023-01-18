import { delay } from '../utility/utils.js';

export default class Printer {
  constructor(printerID) {
    this.printer = document.getElementById(printerID);
    this.progress = this.printer.querySelector('.base .progress-bar .progress');
    this.progressValue = 0;
    this.undock();
  }
  start() {
    this.animation = setInterval(() => {
      this.printer.classList.toggle('complete');
    }, 1000);
  }
  complete() {
    clearInterval(this.animation);
    this.printer.classList = 'printer complete';
  }
  undock() {
    this.printer.classList.add('clear');
  }
  dock() {
    this.printer.classList.remove('clear');
  }
  setProgress(progress) {
    // console.log(progress);
    this.progressValue = progress;
    this.progress.style.width = this.progressValue * 100 + '%';
  }
  completeWork(timeRequired) {
    return new Promise((resolve, reject) => {
      this.dock();
      this.start();
      const PROGRESS_UPDATE_DELAY = 100;
      const strokes = (timeRequired * 1000) / PROGRESS_UPDATE_DELAY;
      let strokeCompleted = 0;
      const progressAnimation = setInterval(() => {
        strokeCompleted += 1;
        const progress = strokeCompleted / strokes;
        this.setProgress(progress);
        if (progress >= 1) {
          this.setProgress(0);
          clearInterval(progressAnimation);
          this.complete();
          resolve();
        }
      }, PROGRESS_UPDATE_DELAY);
    });
  }
}
