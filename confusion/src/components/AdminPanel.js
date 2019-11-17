import { Link } from 'react-router-dom';
import React, { Component, useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Button,
  CardText,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  FormText,
  Input,
  CardBody,
} from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Fade } from 'react-animation-components';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const AdminPanel = props => {
  console.log('PROPS INSIDE ADMINPANEL', props);
  // eslint-disable-next-line class-methods-use-this
  /* handleSubmitaddDish(values) {
    const { postFeedback, resetFeedbackForm } = this.props;

    console.log(`Current State is: ${JSON.stringify(values)}`);
    alert(`Current State is: ${JSON.stringify(values)}`);
    postFeedback(
      values.firstname,
      values.lastname,
      values.telnum,
      values.email,
      values.agree,
      values.contactType,
      values.message
    );
    resetFeedbackForm();
    // event.preventDefault();
  }

  handlesubmitFlagDish(values) {
    const { postFeedback, resetFeedbackForm } = this.props;

    console.log(`Current State is: ${JSON.stringify(values)}`);
    alert(`Current State is: ${JSON.stringify(values)}`);
    postFeedback(
      values.firstname,
      values.lastname,
      values.telnum,
      values.email,
      values.agree,
      values.contactType,
      values.message
    );
    resetFeedbackForm();
    // event.preventDefault();
  }

  handlesubmitFlagLeader(values) {
    const { postFeedback, resetFeedbackForm } = this.props;

    console.log(`Current State is: ${JSON.stringify(values)}`);
    alert(`Current State is: ${JSON.stringify(values)}`);
    postFeedback(
      values.firstname,
      values.lastname,
      values.telnum,
      values.email,
      values.agree,
      values.contactType,
      values.message
    );
    resetFeedbackForm();
    // event.preventDefault();
  } */

  // ////////////////// TABS  //////////////////// //////////////////// ////////////
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // ////////////////// Form validation with react-redux-forms. ////////////////////

  const required = val => val && val.length;

  // A function of functions.
  const maxLength = len => val => !val || val.length <= len;
  const minLength = len => val => val && val.length >= len;
  // eslint-disable-next-line no-restricted-globals
  const isNumber = val => !isNaN(Number(val));
  const validEmail = val =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

  // /////////////////////// RENDER DISHES ////////////////////////////

  // //////////////////// USERS  //////////////////////

  const menu = props.dishes.map(dish => (
    <div className="col-12 m-1" key={dish.id}>
      {/* Dishes is destructured out of "props" */}
      <RenderMenuItem dish={dish} onClick={props.dishes.onClick} />
    </div>
  ));

  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.dishes.dishes.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  function RenderMenuItem({ dish }) {
    return (
      <Card>
        <Link to={`/menu/${dish.id}`}>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle style={{ color: 'black' }}>{dish.name}</CardTitle>
            <Row className="form-group">
              <Col md={{ size: 6, offset: 0 }}>
                <div className="form-check">
                  <Label check>
                    <Control.checkbox
                      model=".dish"
                      name="dish"
                      className="form-check-input"
                    />{' '}
                    <Errors
                      className="text-danger"
                      model=".dish"
                      show="touched"
                      messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less',
                      }}
                    />
                    <p style={{ color: 'black' }}>
                      Add Dish to frontpage as "promoted" dish
                    </p>
                  </Label>
                </div>
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 0 }}>
                <Button type="submit" color="primary">
                  Submit Dish
                </Button>
                <Button type="submit" color="danger">
                  Delete Dish
                </Button>
              </Col>
            </Row>
          </CardImgOverlay>
        </Link>
      </Card>
    );
  }

  RenderMenuItem.propTypes = {
    dish: PropTypes.object.isRequired,
  };

  // ///////////////////// LEADERS //////////////////////

  const leaderlist = props.leaders.map(leader => (
    <div className="col-12" key={leader.id}>
      <RenderLeaders leaders={leader} />
    </div>
  ));

  if (props.leaders.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (props.leaders.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.leaders.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  function RenderLeaders({ leaders }) {
    if (leaders != null)
      return (
        <Card>
          <Fade in>
            <CardBody>
              <div className="row">
                <div className="col-2">
                  <CardImg
                    width="100%"
                    src={baseUrl + leaders.image}
                    alt={leaders.name}
                  />
                </div>
                <div className="col-10">
                  <CardTitle>{leaders.name}</CardTitle>
                  <CardText>{leaders.description}</CardText>
                  <br></br>
                </div>
              </div>

              <Row className="form-group">
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".leader"
                        name="leader"
                        className="form-check-input"
                      />{' '}
                      <Errors
                        className="text-danger"
                        model=".leader"
                        show="touched"
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less',
                        }}
                      />
                      <p style={{ color: 'black' }}>
                        Add Leader to frontpage as "promoted" leader
                      </p>
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit information
                  </Button>
                  <Button type="submit" color="danger">
                    Delete leader
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Fade>
        </Card>
      );
    return <div></div>;
  }

  RenderLeaders.propTypes = {
    leaders: PropTypes.object.isRequired,
  };

  // //////////////////// USERS  //////////////////////

  /*  const { users } = props; */

  const userlist = props.users.users.map(user => (
    <div className="col-12 m-1" key={user.id}>
      <RenderUsers users={user} />
    </div>
  ));

  if (props.users.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (props.users.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.users.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  function RenderUsers({ users }) {
    if (users != null)
      return (
        <Card>
          <Fade in>
            <CardBody>
              <div className="row">
                <div className="col-2">
                  <CardImg
                    width="100%"
                    src={baseUrl + users.image}
                    alt={users.name}
                  />
                </div>
                <div className="col-10">
                  <CardTitle>{users.name}</CardTitle>
                  <CardText>{users.description}</CardText>
                  <br></br>
                </div>
              </div>

              <Row className="form-group">
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".user"
                        name="user"
                        className="form-check-input"
                      />{' '}
                      <Errors
                        className="text-danger"
                        model=".user"
                        show="touched"
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less',
                        }}
                      />
                      <p style={{ color: 'black' }}>
                        Ban User for prohibited actions (48hours)
                      </p>
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                  <Button type="submit" color="danger">
                    Delete User
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Fade>
        </Card>
      );
    return <div></div>;
  }

  RenderUsers.propTypes = {
    users: PropTypes.object.isRequired,
  };

  return (
    <div className="container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            New Dish
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Current Dishes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Current Leaders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
            }}
          >
            Current Users
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="container">
            <hr />
            <div className="col-12 col-sm-10 offset-sm-1">
              <LocalForm
                model="feedback"
                onSubmit={values => this.handleSubmit(values)}
              >
                <Row className="form-group">
                  <Label htmlFor="dishname" md={2}>
                    Dish Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".dishname"
                      id="dishname"
                      name="dishname"
                      placeholder="Dish Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(5),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Fade in>
                      <Errors
                        className="text-danger"
                        model=".dishname"
                        show="touched"
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less',
                        }}
                      />
                    </Fade>
                  </Col>
                </Row>

                <Row>
                  <Col md={{ size: 6, offset: 2 }}>
                    <Label for="exampleFile">Image Upload </Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                      Upload Image of the dish, jpg max 5mb.
                    </FormText>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="message" md={2}>
                    Your Feedback
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".message"
                      id="message"
                      name="message"
                      rows="12"
                      className="form-control"
                    />
                    <Errors
                      className="text-danger"
                      model=".message"
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
                  <Col md={{ size: 6, offset: 2 }}>
                    <div className="form-check">
                      <Label check>
                        <Control.checkbox
                          model=".dish"
                          name="dish"
                          className="form-check-input"
                        />{' '}
                        <Errors
                          className="text-danger"
                          model=".dish"
                          show="touched"
                          messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less',
                          }}
                        />
                        Add Dish to frontpage as "promoted" dish
                      </Label>
                    </div>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Submit Dish
                    </Button>
                    <Button type="submit" color="danger">
                      Delete Dish
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <hr />
              </div>
            </div>
            <div className="column col-12">{menu} </div>
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="row row-content">
            <div className="col-12"></div>
            <div className="col-12">{leaderlist}</div>
          </div>
        </TabPane>
        <TabPane tabId="4">
          <div className="row row-content">
            <div className="col-12"></div>
            <div className="col-12">{userlist}</div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};
export default AdminPanel;
