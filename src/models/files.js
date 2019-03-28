import filesServices from '../services/files';
import { redirectWXAuthURL, saveLocalStorage, getLocalStorage } from '../utils/utils';
import loginServices from '../services/login';

export default {

  namespace: 'files',

  state: {
    list: [],
    url: '/login',  //['/login', /upload', '/selectParams', '/order']
    info: {},
    currentOrder: {},
  },

  effects: {
    *login({ payload: { code } }, {call, put}) {
      if(code) {
        const { data } = yield call(loginServices.login, {code});
        yield put({type: 'save_user_info', payload: data.id});
        saveLocalStorage({type:'logined', value: data.id})
        yield put({type: 'saveUrl', payload: '/upload'})
      }else {
        redirectWXAuthURL();
      }
    },
    *upload({ payload }, {call, put}) {
      const { data } = yield call(filesServices.upload, payload);
      yield put({type: 'saveCurrentFile', payload: data})

      yield put({type: 'saveUrl', payload: '/selectParams'})
      yield put({type: 'query', payload: {user_id: payload.user_id}})

    },

    *query({ payload }, {call, put}) {
      const { data } = yield call(filesServices.query, payload);
      yield put({type: 'save', payload: data})
    },

    *confirmOrder({ payload }, {call, put}) {
      const { data } = yield call(filesServices.confirmOrder, payload);
      yield put({type: 'saveCurrentOrder', payload: data})
      console.log(data)

      yield put({type: 'saveUrl', payload: '/order'})
      yield put({type: 'query', payload: {user_id: payload.user_id}})
    },
  },

  reducers: {
    save_user_info(state, { payload }) {
      return {...state, id: payload};
    },
    save(state, { payload }) {
      return {...state, list: payload}
    },
    saveUrl(state, { payload }) {
      return {...state, url: payload}
    },
    saveCurrentFile(state, { payload }) {
      return {...state, info: payload}
    },
    saveCurrentOrder(state, { payload }) {
      return {...state, currentOrder: payload}
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      if(getLocalStorage('logined')) {
        dispatch({type:'saveUrl', payload: '/upload'})
      }
    },
  },

};
