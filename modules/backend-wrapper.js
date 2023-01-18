import { get } from '../utility/utils.js';

const BASE_URL = 'https://3-d-printer-prototype-backend.vercel.app';

export async function getOrders() {
  const response = await get(BASE_URL + '/get_orders');
  const orders = JSON.parse(response);
  orders.forEach((order) => {
    order.completionTime = parseInt(order.completionTime);
    order.home = parseInt(order.home);
  });
  return orders;
}

export async function getIncompleteOrders() {
  const orders = await getOrders();
  const incompleteOrders = [];
  orders.forEach((order) => {
    const status = order.status;
    if (status === 'complete') return;
    incompleteOrders.push(order);
  });
  return incompleteOrders;
}

export async function addOrder(name, completionTime, homeIndex) {
  const response = await get(
    BASE_URL +
      '/add_order?name=' +
      name +
      '&completionTime=' +
      completionTime +
      '&homeIndex=' +
      homeIndex
  );
  return JSON.parse(response);
}

export async function setPendingOrder(id) {
  const response = await get(BASE_URL + '/pending_order?id=' + id);
  return JSON.parse(response);
}

export async function setProcessOrder(id) {
  const response = await get(BASE_URL + '/process_order?id=' + id);
  return JSON.parse(response);
}

export async function setCompleteOrder(id) {
  const response = await get(BASE_URL + '/complete_order?id=' + id);
  return JSON.parse(response);
}

export async function deleteOrder(id) {
  const response = await get(BASE_URL + '/delete_order?id=' + id);
  return JSON.parse(response);
}

export async function truncateOrder() {
  const response = await get(BASE_URL + '/truncate');
  return JSON.parse(response);
}
