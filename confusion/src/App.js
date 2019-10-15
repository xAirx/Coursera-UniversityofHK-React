import React, { Component } from 'react';
/* import logo from './assets/images/logo.png'; */
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
//Importing dishes.
import { DISHES } from './shared/dishes';


class App extends Component {
  constructor(props) {
    super(props);
    // Setting State to dishes.
    this.state = {
      dishes: DISHES
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        {/* Passing our dishes down as props */}
        <Menu dishes={this.state.dishes} />

      </div>
    );
  }
}

export default App;
