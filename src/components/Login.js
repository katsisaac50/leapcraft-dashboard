import React, { Component } from 'react'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap'

class Login extends Component {
    handleChange(){}
    handleSubmit(){}

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