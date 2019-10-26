import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

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
  render() {
    /*     const { name } = this.state.dish.name;
     */
    /*  Pulls out this.state.dishes and creates a const containing dishes */

    // These are arrays passed from the store.
    const { dishes } = this.props;
    const { comments } = this.props;
    const { leaders } = this.props;
    const { promotions } = this.props;

    // Functional component sending props to DishDetail component
    // we are passing the matched route into the function
    // we will use the match.params to get the params from the route
    // That we need to send the correct dish.Id clicked to DishDetail
    // Presentational Component for rendering.

    // Filter SECTION

    const featureddish = dishes.filter(dish => dish.featured)[0];
    const featuredpromotion = promotions.filter(promo => promo.featured)[0];
    const featuredleaders = leaders.filter(lead => lead.featured)[0];

    return (
      <>
        <Header />
        {/* Switch enables me to group routes together.
Here we iterate over children and find the first one that matches path. */}
        <Switch>
          {/* Passing functional component into route for home. */}
          <Route
            path="/home"
            component={() => (
              <Home
                dish={featureddish}
                promotion={featuredpromotion}
                leader={featuredleaders}
              />
            )}
          />
          <Route path="/about" component={() => <About leaders={leaders} />} />
          {/*  match should match this exact pathname */}
          <Route
            path="/menu/:dishId"
            component={({ match }) => (
              <DishDetail
                dish={
                  dishes.filter(
                    /* match.params.dishId is a string converted to an int using base10
                    make sure its an integer WE MAKE SURE. */
                    /* dish => dish.id === parseInt(match.params.dishId, 10)
                    Number only converts to a number */
                    dish => dish.id === Number(match.params.dishId)
                  )[0]
                }
                comments={comments.filter(
                  comment => comment.dishId === Number(match.params.dishId)
                )}
              />
            )}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={dishes} />}
          />
          <Route exact path="/contactus" component={Contact} />} />
          {/*     Default route  */}
          <Redirect to="/home" />
        </Switch>
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
export default withRouter(connect(mapStateToProps)(Main));

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
