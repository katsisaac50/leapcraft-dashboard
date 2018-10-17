import React, { Component } from 'react'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap'
import {post, get } from 'axios';

class Login extends Component {
    handleChange(){}
    
    handleSubmit = e => {
        e.preventDefault();    
        post("https://dashboard.cphsense.com/api/v2/auth/new", {
            // credentials set from here to be set to the server
            username: e.target.email.value,
            password: e.target.password.value
        })
        .then(res => {
            console.log(res)
            const token = res.data.access_token
            // defaults.headers.common['Authorization'] = `Bearer ${ token }`;
            return get("https://dashboard.cphsense.com/api/v2/devices/", {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
        })
        .then(res => {
            // this.props.devicesData(res.data)
            // this.setState({devices: res.data});
            // this.setState({ redirectToReferrer: true });
            this.props.setDevices(res.data);
            this.props.history.push('/devices');
        })
        .catch(console.log)
        // this.setState({
        //     email: "",
        //     password: ""
        // })
    }

    render () {
        return (
        <div className='App'>
            {/* <Devices deviceNames={'this.state.devices'}/> */}
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId='formHorizontalEmail'>
                <Col componentClass={ControlLabel} sm={2}> Email
                </Col>
                <Col sm={5}>
                <FormControl
                type='email'
                placeholder='Email'
                name='email'
                onChange={this.handleChange}
                required />
                </Col>
            </FormGroup>
            <FormGroup controlId='formHorizontalPassword'>
                <Col componentClass={ControlLabel} sm={2}> Password
                </Col>
                <Col sm={5}>
                <FormControl
                type='password'
                placeholder='Password'
                name='password'
                onChange={this.handleChange}
                autoComplete='new-password'
                required />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={2} sm={5}>
                <Checkbox>
                Remember me
                </Checkbox>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={2} sm={5}>
                <Button type='submit'>
                Sign in
                </Button>
                </Col>
            </FormGroup>
            </Form>
        </div>
        )
    }
}

export default Login;