import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getRemoteList,EditRecord,DeleteRecord} from './service'

interface UsersModelType{
    namespace: "users",
    state: {},
    reducers: {
        getList: Reducer
    },
    effects: {
        getRemote: Effect,
        edit: Effect
    },
    subscription: {
        setup: Subscription
    }
}

const UsersModel = {
    namespace: "users",
    state: {},
    reducers: {
        goList(state: any, {payload}: any){
            return payload;
        }
    },
    effects: {
        *getRemote(action: any, {put,call}: any){
          
            const data = yield call(getRemoteList)
            // console.log(data);
            
            yield put({
                type: 'goList',
                payload: data
            })
        },

        *edit( {payload: {id,values} }, {put,call}){          
            // console.log(id,values);
            const data  = yield call(EditRecord,{id,values})                
        },

        *delete({payload:{id}},{put,call}){
            // console.log("delete");
            const data = yield call(DeleteRecord,id)            
            
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }) => {
              if (pathname === '/users') {
                dispatch({ type: 'getRemote' });
              }
            });
          },
        },
};

export default UsersModel;
