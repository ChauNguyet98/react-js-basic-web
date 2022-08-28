import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

class AddUser extends React.Component {
  state = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    validated: false,
    // setValidated: false,
  };

  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.isOpen) {
        const isEmptyObj = Object.keys(this.props.user).length === 0;
        if (!isEmptyObj) {
          this.setState({
            id: this.props.user.id,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            email: this.props.user.email,
          });
        } else {
          this.setState({
            id: "",
            first_name: "",
            last_name: "",
            email: "",
          });
        }
      }
    }, 100);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    console.log(form.checkValidity());
    console.log(form);

    if (form.checkValidity() === false) {
      return;
    }

    this.setState({
      validated: true,
    });

    const user = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
    };
    this.props.addUser(user);
    this.props.closeModal();
  };

  handleChangeFirstName = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  };

  handleChangeLastName = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    let { first_name, last_name, email, validated } = this.state;

    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
          <Modal.Header>
            <h5>Add User</h5>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form
                noValidate
                validated={validated}
                onSubmit={($event) => this.handleSubmit($event)}
              >
                {/* <Row className="mb-3"> */}
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={first_name}
                    placeholder="First Name"
                    onChange={($event) => this.handleChangeFirstName($event)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please input first name!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={last_name}
                    placeholder="Last Name"
                    onChange={($event) => this.handleChangeLastName($event)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please input last name!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={($event) => this.handleChangeEmail($event)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please input your email!
                  </Form.Control.Feedback>
                </Form.Group>

                <Modal.Footer>
                  <Button variant="secondary" onClick={this.props.closeModal}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddUser;
