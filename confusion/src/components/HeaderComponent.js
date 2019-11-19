/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.setLogin = this.setLogin.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      isModalRegisterModalOpen: false,
      isLoggedIn: false,
    };
  }

  RenderButton = () => {
    if (this.state.isLoggedIn === true) {
      return (
        <Button
          /*  className="Loginbutton" */
          outline
          onClick={this.handleLogin}
        >
          Login
        </Button>
      );
    }
    return (
      <Button
        /*  className="Loginbutton" */
        outline
        onClick={this.handleLogout}
      >
        logout
      </Button>
    );
  };

  handleLogout(event) {
    const { logout } = this.props;
    logout(this.username.value, this.password.value);
    this.setLogin();
    event.preventDefault();
  }

  handleLogin(event) {
    const { login } = this.props;
    this.toggleModal();
    this.setLogin();
    /* alert(
      `Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`
    ); */
    login(this.username.value, this.password.value);
    event.preventDefault();
    // REDUX ACTION
    /* this.loginUser(); */
  }

  handleRegister(event) {
    const { register } = this.props;
    this.toggleRegisterModal();
    register(this.username.value, this.password.value);
    alert(`Username: ${this.username.value} Password: ${this.password.value}`);
    event.preventDefault();
    // REDUX ACTION
    /* this.registerUser(); */
  }

  setLogin() {
    this.setState(({ isLoggedIn }) => ({
      isLoggedIn: !isLoggedIn,
    }));
  }

  toggleModal() {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  }

  toggleRegisterModal() {
    this.setState(({ isModalRegisterModalOpen }) => ({
      isModalRegisterModalOpen: !isModalRegisterModalOpen,
    }));
  }

  toggleNav() {
    this.setState(({ isNavOpen }) => ({
      isNavOpen: !isNavOpen,
    }));
  }

  render() {
    const { isNavOpen, isModalOpen, isModalRegisterModalOpen } = this.state;

    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="" href="/"></NavbarBrand>
            <Collapse isOpen={isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/about">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <this.RenderButton></this.RenderButton>
                  <Button
                    /*  className="Loginbutton" */
                    outline
                    onClick={this.handleRegister}
                  >
                    Register
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <h1>Ristorante con Fusion</h1>
          <p>
            We take inspiration from the World's best cuisines, and create a
            unique fusion experience. Our lipsmacking creations will tickle your
            culinary senses!
          </p>
        </Jumbotron>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />
                  Remember me
                </Label>
                <Button
                  className="loginbutton"
                  type="submit"
                  value="submit"
                  color="primary"
                >
                  <span className="fa fa-user fa-lg"></span> Login
                </Button>
                <Button
                  className="loginbutton"
                  type="submit"
                  value="submit"
                  color="primary"
                >
                  <span className="fa fa-facebook fa-lg"></span>Facebook Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

        {/*  /////////////// REGISTER //////////////// */}
        <Modal
          isOpen={isModalRegisterModalOpen}
          toggle={this.toggleRegisterModal}
        >
          <ModalHeader toggle={this.toggleRegisterModal}>Register</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleRegister}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
                <FormGroup>
                  <Button type="submit" value="submit" color="primary">
                    Submit Registration
                  </Button>
                </FormGroup>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Header;
