import React, {Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
import Devices from './components/Devices';

// export default (
//     <Router>
//         <div>
//             <Route path='/' component={App}></Route>
//             <Route path='/login' component={Login}></Route>
//             <Route
//                 path='/devices'
//                 render={(props) => <Devices />}
//             >
//             </Route>
//         </div>
//     </Router>
// )

class routes extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    setDevices(devices) {
        this.setState({ devices: devices });
    }

    render (){
        //  devices={this.state.devices}
        // console.log(this.state);

        return (
            <Router>
                <div>
                    <Route path='/' component={App}></Route>
                    <Route path='/login'
                        render = {(props) => <Login {...props} setDevices={this.setDevices.bind(this)} />}
                    ></Route>
                    <Route
                        path='/devices'
                        render={(props) => <Devices {...props} devices={this.state.devices}/>}
                    >
                    </Route>
                </div>
            </Router>
        )
    }
}

export default routes;