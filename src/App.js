import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './Home';

import './App.css';
import ModuleShowClients from './pages/modules/ModuleShowClients';
import ModuleAddClients from './pages/modules/ModuleAddClients';
import ModuleEditClients from './pages/modules/ModuleEditClient,';
import ModuleShowProducts from './pages/modules/ModuleShowProducts';
import ModuleAddProducts from './pages/modules/ModuleAddProducts';

function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path='/' exact element={<Login />}></Route>
            <Route path='/Register' exact element={<Register />}></Route>
            <Route path='/home' exact element={<Home />}></Route>
            <Route path='/clients' exact element={<ModuleShowClients />}></Route>
            <Route path='/clients/add' exact element={<ModuleAddClients />}></Route>
            <Route path='/clients/edit/:id' exact element={<ModuleEditClients/>}></Route>
            <Route path='/products' exact element={<ModuleShowProducts />}></Route>
            <Route path='/products/add' exact element={<ModuleAddProducts />}></Route>
          </Routes>
        </Router>
      </Fragment>

    </div>
  );
}


export default App;
