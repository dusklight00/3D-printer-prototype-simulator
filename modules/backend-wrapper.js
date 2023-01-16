import { get } from "../utility/utils.js";

const BASE_URL = "https://3-d-printer-prototype-backend.vercel.app";

export async function getOrders() {
  const response = await get(BASE_URL + "/get_orders");
  return JSON.parse(response);
}

export async function addOrder(name, model) {
  const response = await get(
    BASE_URL + "/add_order?name" + name + "&model=" + model
  );
  return JSON.parse(response);
}

export async function setPendingOrder(id) {
  const response = await get(BASE_URL + "/pending_order?id=" + id);
  return JSON.parse(response);
}

export async function setProcessOrder(id) {
  const response = await get(BASE_URL + "/process_order?id=" + id);
  return JSON.parse(response);
}

export async function setCompleteOrder(id) {
  const response = await get(BASE_URL + "/complete_order?id=" + id);
  return JSON.parse(response);
}

export async function deleteOrder(id) {
  const response = await get(BASE_URL + "/delete_order?id=" + id);
  return JSON.parse(response);
}

export async function truncateOrder() {
  const response = await get(BASE_URL + "/truncate");
  return JSON.parse(response);
}
