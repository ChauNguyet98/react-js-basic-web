import React from "react";
import { Button, Form } from "react-bootstrap";

class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    validated: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    this.setState({
      validated: !form.checkValidity() ? true : false,
    });
  };

  handleChangeUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  render() {
    const { userName, password, validated } = this.state;
    return (
      <div className="login container">
        <div className="login__title">Login</div>
        <Form
          className="login__form"
          noValidate
          validated={validated}
          onSubmit={($event) => this.handleSubmit($event)}
        >
          <Form.Group controlId="userName">
            <Form.Label className="login__form--label">UserName</Form.Label>
            <Form.Control
              required
              type="text"
              value={userName}
              placeholder="UserName"
              onChange={($event) => this.handleChangeUserName($event)}
            />
            <Form.Control.Feedback
              className="login__form--error-message"
              type="invalid"
            >
              Please input username!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="login__form--label">Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={($event) => this.handleChangePassword($event)}
            />
            <Form.Control.Feedback
              className="login__form--error-message"
              type="invalid"
            >
              Please input password!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="login__form--btn">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Login;
