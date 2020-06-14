import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignIn from './components/login/Signin'
import SignUp from './components/login/SingUp'
import UsersList from "./components/users/usersList"
import 'bootstrap/dist/css/bootstrap.min.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path = '/' exact component={SignIn}/>
        <Route path = '/SignUp' exact component={SignUp}/>
        <MuiThemeProvider>
        <Route path = '/users' exact component={UsersList}/>
        </MuiThemeProvider>
      </Router>
    </div>
  );
}

export default App;
