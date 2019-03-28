
import { getQueryString, redirectWXAuthURL, saveLocalStorage } from '../utils/utils';
import loginServices from '../services/login';


export default {

  namespace: 'user',

  state: {
  },

  effects: {
    *login({ payload: { code } }, {call, put}) {
      if(code) {
        const { data } = yield call(loginServices.login, {code});
        yield put({type: 'save', payload: data.id});
        saveLocalStorage({type:'logined', value: data.id})
      }else {
        redirectWXAuthURL();
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {...state, id: payload};
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // const code = getQueryString('code');
      // dispatch({
      //   type: 'login',
      //   payload: { code }
      // })

      // history.listen( ({pathname}) => {
      //   const code = getQueryString('code');
      //   if( pathname === '/' ) {
      //     dispatch({type: 'login', payload: { code }})
      //   }
      // })
    }
  },

};
