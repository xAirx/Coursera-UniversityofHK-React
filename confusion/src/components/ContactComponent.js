import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  FormFeedback,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: '',
      touch: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  // FORKLAR DETTE!!!!!
  handleBlur = field => evt => {
    const { touched } = this.state;

    this.setState({
      touched: {
        touched: { ...{ touched }, [field]: true },
      },
    });
  };

  handleInputChange(event) {
    /* const target = event.target; */
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    /*  const name = target.name; */
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    /* console.log('Current state is:  + JSON.stringify(this.state)); */
    console.log(`Current state is: ${JSON.stringify(this.state)}`);
    alert(`Current state is: ${JSON.stringify(this.state)}`);
    event.preventDefault();
  }

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
    };

    const { touched } = this.state;

    if (touched.firstname && firstname.length < 3)
      errors.firstname = 'First Name should be >= 3 characters';
    else if (touched.firstname && firstname.length > 10)
      errors.firstname = 'First Name should be <= 10 characters';

    if (touched.lastname && lastname.length < 3)
      errors.lastname = 'Last Name should be >= 3 characters';
    else if (touched.lastname && lastname.length > 10)
      errors.lastname = 'Last Name should be <= 10 characters';

    const reg = /^\d+$/;
    if (touched.telnum && !reg.test(telnum))
      errors.telnum = 'Tel. Number should contain only numbers';

    if (touched.email && email.split('').filter(x => x === '@').length !== 1)
      errors.email = 'Email should contain a @';

    return errors;
  }

  render() {
    const { firstname, lastname, telnum, email } = this.state;

    const errors = this.validate(
      { firstname },
      { lastname },
      { telnum },
      { email }
    );

    return (
      <div className="container">
        <div className="row row-content">
          <div className="col-12">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Contact Us</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>Contact Us</h3>
                <hr />
              </div>
            </div>
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a role="button" className="btn btn-info">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your Feedback</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="firstname" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    value={firstname}
                    valid={errors.firstname === ''}
                    invalid={errors.firstname !== ''}
                    onBlur={this.handleBlur('firstname')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="lastname" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    valid={errors.lastname === ''}
                    invalid={errors.lastname !== ''}
                    onBlur={this.handleBlur('lastname')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="telnum" md={2}>
                  Contact Tel.
                </Label>
                <Col md={10}>
                  <Input
                    type="tel"
                    id="telnum"
                    name="telnum"
                    placeholder="Tel. Number"
                    value={telnum}
                    valid={errors.telnum === ''}
                    invalid={errors.telnum !== ''}
                    onBlur={this.handleBlur('telnum')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.telnum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    valid={errors.email === ''}
                    invalid={errors.email !== ''}
                    onBlur={this.handleBlur('email')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;
