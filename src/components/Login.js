import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap'
import { post, get } from 'axios'
import './App.css'

class Login extends React.Component {

  constructor () {
    super()

    this.state = {
      redirectToReferrer: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange () {}

  handleSubmit (e) {
    e.preventDefault()
    post('https://dashboard.cphsense.com/api/v2/auth/new', {
      // credentials set from here to be set to the server
      username: e.target.email.value,
      password: e.target.password.value
    })
      .then(res => {
        console.log(res)
        const token = res.data.access_token
        // defaults.headers.common['Authorization'] = `Bearer ${ token }`
        return get('https://dashboard.cphsense.com/api/v2/devices/', {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
      })
      .then(res => {
        this.props.setDevices(res.data)
      })
      .catch(console.log)

    appAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    console.log(this.props)
    return (
      <div class='auth-wrapper d-flex no-block justify-content-center align-items-center'>
        <div className='auth-box'>
          <div className='logo'>
          <span ><img className="db"src="http://www.leapcraft.dk/assets/images/leapcraft_black.png" alt="logo"/></span>
            <h5 class='font-medium m-b-20'>Sign In to DashBoard</h5>
          </div>
            {/*...Form......*/} 
            <div className="row">
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId='formHorizontalEmail'>
              <Col componentClass={ControlLabel} sm={2}> Email
              </Col>
              <Col sm={10}>
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
              <Col sm={10}>
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
           
        </div>
      </div>
    )
  }

}

/* A fake authentication function */

export const appAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  }
}

export default Login
