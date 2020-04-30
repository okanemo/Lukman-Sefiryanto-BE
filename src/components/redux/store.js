import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import reducers from './reducers';

const logger = createLogger({});
const persistConfig = {
    key: 'authpersist',
    storage,
    whitelist: ['authpersist']
}
const persReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persReducer,
    compose(
        applyMiddleware(
            logger,
            promiseMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
let persistor = persistStore(store)
export {
    store,
    persistor
}
