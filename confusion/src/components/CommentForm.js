import React, { Component } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from 'reactstrap';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Control, LocalForm, Errors } from 'react-redux-form';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    // destructing in function argument
    // we know inside this.state(state,props);
    // state comes first into setstate and then props.
    // if we wanted to destrucrure state and then props we would do the following:

    /*     this.setState(({ isNavOpen}, { props })) */

    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(values) {
    console.log('THIS IS THE VALUES', values);
    console.log('These are the DISHID', this.props.dishId);
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    /*  console.log(`Current State is: ${JSON.stringify(values)}`);
     alert(`Current State is: ${JSON.stringify(values)}`); */
    // event.preventDefault();
  }

  render() {
    console.log('THIS IS INSIDE COMMENTFORM', this.props.postComment);

    const { isModalOpen } = this.state;

    const required = val => val && val.length;

    // A function of functions.
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;
    // eslint-disable-next-line no-restricted-globals

    /* const isNumber = val => !isNaN(Number(val));
    const validEmail = val =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); */

    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>Submit Comment
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Fade in>
                    <Control.select model="user.faveColor" id="user.faveColor">
                      <option value="1">1</option>
                      <option value="2">3</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Control.select>
                  </Fade>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default CommentForm;
