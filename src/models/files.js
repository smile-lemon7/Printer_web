import filesServices from '../services/files';

export default {

  namespace: 'files',

  state: {
    list: [],
    url: '/upload',  //['/upload', '/selectParams', '/order']
    info: {},
    currentOrder: {},
  },

  effects: {
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
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

};
