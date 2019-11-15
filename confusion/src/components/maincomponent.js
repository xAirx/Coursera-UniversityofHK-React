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
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
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
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    /*     const { name } = this.state.dish.name;
     */
    /*  Pulls out this.state.dishes and creates a const containing dishes */

    // These are arrays passed from the store.
    /* const { dishes } = this.props; */
    /* const { comments } = this.props; */
    /*  const { leaders } = this.props;
     const { promotions } = this.props; */

    // Functional component sending props to DishDetail component
    // we are passing the matched route into the function
    // we will use the match.params to get the params from the route
    // That we need to send the correct dish.Id clicked to DishDetail
    // Presentational Component for rendering.

    // Filter SECTION

    /* const featureddish = dishes.dishes.filter(dish => dish.featured)[0];
    const featuredpromotion = promotions.filter(promo => promo.featured)[0];
    const featuredleaders = leaders.filter(lead => lead.featured)[0]; */

    return (
      <>
        <Header />
        {/* Switch enables me to group routes together.
Here we iterate over children and find the first one that matches path. */}

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              {/* Passing functional component into route for home. */}

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
                    leaderLoading={this.props.promotions.isLoading}
                    leaderErrMess={this.props.promotions.errMess}
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
  dishes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  leaders: PropTypes.array.isRequired,
  promotions: PropTypes.array.isRequired,
};

// connecting main component to the redux store so they can talk.
// Wrapping everything with withRouter so our routing works with redux aswell.
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
// Functional component sending props to Home component
// Make it prettier in the router..
// Here we are sending the featured dish/leader/promotion.

/* Filter returns an array so we select the first index.
That is featured first index of array.
filter returns new array with the features dish.
*/

/*    const HomePage = () => (
<Home
dish={dishes.filter(dish => dish.featured)[0]}
promotion={promotions.filter(promo => promo.featured)[0]}
leader={leaders.filter(leader => leader.featured)[0]}
/>
); */
