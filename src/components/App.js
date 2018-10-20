import React, { Component } from "react";
import { BrowserRouter, Redirect, Link, Route, Switch } from "react-router-dom";
import Login, {appAuth} from "./Login";

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

  render() {
    return (
      <BrowserRouter>
      <div>
        <nav className="navbar navbar">
          <ul className="nav">
            <li>
              <Link to="/admin">Admin area</Link>
            </li>
          </ul>
        </nav>

        <Switch>
        <Route path='/login'
        render = {(props) => <Login {...props} setDevices={this.setDevices.bind(this)} />}
    ></Route>
          <PrivateRoute path="/admin" component={Admin} devices={this.state.devices}/>
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
    
    <div>Devices
       <ul>
       {listDevices}
       </ul>
    </div>
  );
};


export default App;

