import request from '../utils/request';

function login({code}) {
  return request(`/api/user/login/${code}/`, {
  	headers: {"Content-Type": "application/json"}
  });
}

export default {
  login,
}