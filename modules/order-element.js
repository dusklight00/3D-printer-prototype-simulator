export default class OrderElement {
  constructor(name, status, modelIndex) {
    this.QUEUE_CONTAINER = document.querySelector('.queue-container');
    const orderElem = this.createOrderElement(name, status, modelIndex);
    this.orderContainer = orderElem.orderContainer;
    this.statusTypeElem = orderElem.statusTypeElem;
    this.QUEUE_CONTAINER.appendChild(this.orderContainer);
  }

  createOrderElement(name, status, modelIndex) {
    const MODEL_PATHS = [
      'assets/car-model.jpg',
      'assets/dragon-model.jpg',
      'assets/frog-model.jpg',
      'assets/marbel-model.jpg',
    ];
    // Declaring Elements
    const orderContainer = document.createElement('div');
    orderContainer.className = 'order-container';
    const model = document.createElement('div');
    model.className = 'model';
    const image = document.createElement('img');
    image.src = MODEL_PATHS[modelIndex];
    const info = document.createElement('div');
    info.className = 'info';
    const nameElem = document.createElement('div');
    nameElem.className = 'name';
    nameElem.innerHTML = name;
    const statusElem = document.createElement('div');
    statusElem.className = 'status';
    statusElem.innerHTML = 'Status: ';
    const statusType = document.createElement('span');
    statusType.className = 'status-type';
    statusType.innerHTML = status;

    // Nesting
    orderContainer.appendChild(model);
    orderContainer.appendChild(info);
    model.appendChild(image);
    info.appendChild(nameElem);
    info.appendChild(statusElem);
    statusElem.appendChild(statusType);

    return {
      orderContainer: orderContainer,
      statusTypeElem: statusType,
    };
  }

  updateStatus(status) {
    this.statusTypeElem.innerHTML = status;
  }

  statusPending() {
    this.updateStatus('Pending');
  }

  statusProcessing() {
    this.updateStatus('Processing');
  }

  statusComplete() {
    this.updateStatus('Complete');
  }

  removeOrder() {
    this.QUEUE_CONTAINER.removeChild(this.orderContainer);
  }
}
