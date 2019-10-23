import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  render() {
    /*     const { name } = this.state.dish.name;
     */
    /*  Pulls out this.state.dishes and creates a const containing dishes */

    const { dishes } = this.state;
    const { comments } = this.state;
    const { leaders } = this.state;
    const { promotions } = this.state;

    // Functional component sending props to DishDetail component
    // we are passing the matched route into the function
    // we will use the match.params to get the params from the route
    // That we need to send the correct dish.Id clicked to DishDetail
    // Presentational Component for rendering.
    const DishWithId = ({ match }) => (
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
          comment => comment.dishId === parseInt(match.params.dishId, 10)
        )}
      />
    );

    // Functional component sending props to Home component
    // Make it prettier in the router..
    // Here we are sending the featured dish/leader/promotion.

    /* Filter returns an array so we select the first index.
       That is featured first index of array.
       filter returns new array with the features dish.
        */

    const HomePage = () => (
      <Home
        dish={dishes.filter(dish => dish.featured)[0]}
        promotion={promotions.filter(promo => promo.featured)[0]}
        leader={leaders.filter(leader => leader.featured)[0]}
      />
    );

    return (
      <>
        <Header />
        {/* Switch enables me to group routes together.
        Here we iterate over children and find the first one that matches path. */}
        <Switch>
          {/* Passing functional component into route for home. */}
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={() => <About leaders={leaders} />} />
          {/*  match should match this exact pathname */}
          <Route path="/menu/:dishId" component={DishWithId} />
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

export default Main;
