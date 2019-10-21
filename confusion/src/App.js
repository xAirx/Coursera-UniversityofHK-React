import React, { Component } from 'react';
/* import logo from './assets/images/logo.png'; */
import './App.css';
/* import { Navbar, NavbarBrand } from 'reactstrap';
 */import Main from './components/MainComponent';
//Importing dishes.
/* import { DISHES } from './shared/dishes';
 */

class App extends Component {

/*   constructor(props) {
    super(props);
    // Setting State to dishes.
    this.state = {
      dishes: DISHES
    }
  }; */

  render() {
    return (
      <div className="App">
      <Main />
      </div>
    );
  }
}

export default App;
