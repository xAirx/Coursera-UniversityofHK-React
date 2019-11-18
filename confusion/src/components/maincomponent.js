/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import AdminPanel from './AdminPanel';
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  fetchUsers,
  logoutUser,
  loginUser,
  registerUser,
} from '../redux/Api/ActionCreators';

const mapDispatchToProps = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  logoutUser: () => dispatch(logoutUser()),
  loginUser: () => dispatch(loginUser()),
  registerUser: () => dispatch(registerUser()),
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'));
  },
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
});

// WIll map the redux stores state in the props that will become available to my component.
const mapStateToProps = state => ({
  // obtaining the state from the redux store.
  // These are derived from the redux store by connecting this component
  // To the redux store.

  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
  users: state.users,
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchUsers();
  }

  render() {
    console.log('THIS ARE PROPS ', this.props);
    return (
      <>
        <Header
          login={this.props.login}
          logout={this.props.logout}
          register={this.props.register}
        />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route
                path="/home"
                component={() => (
                  <Home
                    dish={
                      this.props.dishes.dishes.filter(dish => dish.featured)[0]
                    }
                    dishesLoading={this.props.dishes.isLoading}
                    dishErrMess={this.props.dishes.errMess}
                    promotion={
                      this.props.promotions.promotions.filter(
                        promo => promo.featured
                      )[0]
                    }
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                    leader={
                      this.props.leaders.leaders.filter(
                        leader => leader.featured
                      )[0]
                    }
                  />
                )}
              />

              <Route
                path="/about"
                component={() => <About leaders={this.props.leaders.leaders} />}
              />
              {/*  match should match this exact pathname */}

              <Route
                path="/menu/:dishId"
                component={({ match }) => (
                  <DishDetail
                    dish={
                      this.props.dishes.dishes.filter(
                        dish => dish.id === parseInt(match.params.dishId, 10)
                      )[0]
                    }
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter(
                      comment =>
                        comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                  />
                )}
              />

              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />

              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    postFeedback={this.props.postFeedback}
                    resetFeedbackForm={this.props.resetFeedbackForm}
                  />
                )}
              />

              <Route
                exact
                path="/admin"
                component={() => (
                  <AdminPanel
                    dishesLoading={this.props.dishes.isLoading}
                    dishErrMess={this.props.dishes.errMess}
                    dishes={this.props.dishes.dishes}
                    leaderLoading={this.props.leaders.leaders.isLoading}
                    leaderErrMess={this.props.leaders.leaders.errMess}
                    leaders={this.props.leaders.leaders}
                    /*       usersLoading={this.props.users.isLoading}
                          userErrMess={this.props.users.users.errMess} */
                    users={this.props.users}
                  />
                )}
              />

              {/*     Default route  */}

              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </>
    );
  }
}

Main.propTypes = {
  dishes: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  leaders: PropTypes.object.isRequired,
  promotions: PropTypes.object.isRequired,
  resetFeedbackForm: PropTypes.object.isRequired,
  postFeedback: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchDishes: PropTypes.object.isRequired,
  fetchPromos: PropTypes.object.isRequired,
  fetchLeaders: PropTypes.object.isRequired,
  fetchComments: PropTypes.object.isRequired,
  fetchUsers: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

// connecting main component to the redux store so they can talk.
// Wrapping everything with withRouter so our routing works with redux aswell.
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
