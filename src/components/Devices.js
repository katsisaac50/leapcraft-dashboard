import React, { Component } from 'react';

class Devices extends Component {
    constructor(){
        super()
        this.state={
            devices:{}
        }
    }
    render (){
        const {data} =this.props.devices
        console.log(data);
        /* sessionStorage.setItem('key', JSON.stringify(data))
        var data1 = sessionStorage.getItem('key'); */
        
        let listDevices = data.map(devices => <li key={devices.box_id}>{devices.box_label}</li>)
        return <div>Devices
       <ul>{listDevices}</ul>
        </div>;
    }
}

export default Devices;