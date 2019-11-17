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

import PropTypes from 'prop-types';

import { Fade } from 'react-animation-components';

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
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(values) {
    const { dishId, postComment } = this.props;
    console.log('THIS IS THE VALUES', values);
    console.log('These are the DISHID', dishId);
    this.toggleModal();
    postComment(dishId, values.rating, values.author, values.comment);
    /*  console.log(`Current State is: ${JSON.stringify(values)}`);
     alert(`Current State is: ${JSON.stringify(values)}`); */
    // event.preventDefault();
  }

  render() {
    const { postComment } = this.props;
    console.log('THIS IS INSIDE COMMENTFORM', postComment);

    const { isModalOpen } = this.state;

    const required = val => val && val.length;

    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;

    return (
      <>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
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
                <Label htmlFor="author" md={12}>
                  First Name
                </Label>
                <Col md={6}>
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
                <Label htmlFor="comment" md={12}>
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
                <Col md={{ size: 10, offset: 0 }}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>Submit Feedback
        </Button>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-heart fa-lg"></span> Favorite
        </Button>
      </>
    );
  }
}

CommentForm.propTypes = {
  postComment: PropTypes.object.isRequired,
  dishId: PropTypes.object.isRequired,
};

export default CommentForm;
