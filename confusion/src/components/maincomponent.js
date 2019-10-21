import React, { Component } from 'react';
/* import { Navbar, NavbarBrand } from 'reactstrap';
 */
import Menu from './MenuComponent';
/* import DishDetail from './DishdetailComponent';
 */
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
/*         selectedDish: null
 */    };
  }

/*   onDishSelect(dishId) {
    console.log("ONDISHSELECTISINVOKED: " + dishId);
    this.setState({ selectedDish: dishId});
    console.log(this.state.selectedDish)
  } */

  render() {

    const HomePage = () => {
      return (
          <Home
          />
      )
    };

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
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
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