import React, { Component } from "react";
import { BrowserRouter, Redirect, Link, Route, Switch } from "react-router-dom";
import Login, {appAuth} from "./Login";
import Header from './Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
    devices:{}
  }
  }

  setDevices(devices) {
    this.setState({ devices: devices });
}

showLock(){
  window.location.href=`/signin`;
}

  render() {
    return (
      <BrowserRouter>
      <div>
      <Header onLoginClick={this.showLock.bind(this)} />
        <Switch>
        <Route path='/login'
        render = {(props) => <Login {...props} setDevices={this.setDevices.bind(this)} />}>
        </Route>
        <PrivateRoute path="/signin" component={Admin} devices={this.state.devices}/>
        </Switch>
      </div>
      </BrowserRouter>
      
    );
  }
}

//Private router function
const PrivateRoute = ({ component: Component,props, ...rest  }) => {
  //console.log(rest)
  return (
    
    <Route
      {...rest}
      render={props =>
        appAuth.isAuthenticated === true ? (
          <Component {...rest}/>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
    />
  );
};


//Admin component
const Admin = (props) => {
 
const {data} =props.devices
if(!data)
return null;
        console.log(data);
        let listDevices = data.map(devices => <li key={devices.box_id}>{devices.box_label}</li>)
  return (
    
    <div /* id='logo-container' */>Devices
       <ul>
       {listDevices}
       </ul>
    </div>
  );
};


export default App;

