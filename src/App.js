import React from "react";
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LoginScreen from "./screens/LoginScreen";
import ListScreen from "./screens/ListScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (
                <LoginScreen/>
            )}/>
            <Route exact path="/list" render={() => (
                <ListScreen/>
            )}/>
              <Route exact path="/orders" render={() => (
                  <OrdersScreen/>
              )}/>
              <Route exact path="/profile" render={() => (
                  <ProfileScreen/>
              )}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
