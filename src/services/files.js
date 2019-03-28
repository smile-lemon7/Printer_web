import request from '../utils/request';


function upload(params) {
  return request(`/api/add/file/path/`, {
    method: 'POST',
    body: JSON.stringify(params),
  	headers: {"Content-Type": "application/json"}
  });
}

function query({user_id}) {
  return request(`/api/get/orders/${user_id}/`, {
  	headers: {"Content-Type": "application/json"}
  })
}

function confirmOrder(params) {
  return request(`/api/add/order/`, {
    method: 'POST',
    body: JSON.stringify(params),
  	headers: {"Content-Type": "application/json"}
  });
}

export default {
  upload,
  query,
  confirmOrder
}