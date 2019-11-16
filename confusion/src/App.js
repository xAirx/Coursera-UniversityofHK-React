import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/Maincomponent.js';
import { ConfigureStore } from './redux/Actions/configureStore';

// Making store available.
const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      // Wrapping with our provider, now the store is available to all components.
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
