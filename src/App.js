import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/redux/store';

import Home from './components/home/Home';
import History from './components/history/History';
import Product from './components/product/Product';
import Login from './components/auth/Login';
import User from './components/user/User';
import Cashier from './components/home/Cashier';
import Charts from './components/history/Charts';
// import Pulsa from './components/BeliPulsa/Pulsa';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/product' component={Product} />
          <Route path='/history' component={History} />
          <Route path='/login' component={Login} />
          <Route path='/user' component={User} />
          <Route path='/cashier' component={Cashier} />
          <Route path='/charts' component={Charts} />
          {/* <Route path='/pulsa' component={Pulsa} /> */}
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
