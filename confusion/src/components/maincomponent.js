import React, { Component } from 'react';
/* import { Navbar, NavbarBrand } from 'reactstrap';
 */
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }


/*   onDishSelect(dishId) {
    console.log("ONDISHSELECTISINVOKED: " + dishId);
    this.setState({ selectedDish: dishId});
    console.log(this.state.selectedDish)
  } */


  render() {

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };



    const HomePage = () => {
      return(
          <Home
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    // Will iterate and find the route that matches the URL and navigate to the view.


    return (
      <>
        {/* <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>xs
        </Navbar> */}
        <Header />
         <Switch>
          <Route path='/home' component={HomePage} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path='/contactus' component={Contact} />} />
          <Redirect to="/home" />
          </Switch>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
      </>
    );
  }
}

export default Main;