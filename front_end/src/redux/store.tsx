import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '@/redux/root-reducer';
import rootSaga from '@/redux/root-saga';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

interface ExtendedStore extends Store {
  saga: any;
  runSaga: () => void;
  stopSaga: () => Promise<void>;
  execSagaTasks: (isServer: boolean, tasks: (dispatch: any) => void) => Promise<void>;
}

function initStore(initialState = {}): ExtendedStore {
  const store: ExtendedStore = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  ) as ExtendedStore;

  store.runSaga = () => {
    if (store.saga) {
      return;
    }
    store.saga = sagaMiddleware.run(rootSaga);
  };

  store.stopSaga = async () => {
    if (!store.saga) {
      return;
    }
    store.dispatch(END);
    await store.saga.done;
    store.saga = null;
  };

  store.execSagaTasks = async (isServer, tasks) => {
    store.runSaga();
    tasks(store.dispatch);
    await store.stopSaga();
    if (!isServer) {
      store.runSaga();
    }
  };

  // Initial run
  store.runSaga();

  return store;
}

export default initStore;
