import { React } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { HeaderNavBar } from "components/navbar/HeaderNavBar";

export const App = ({ history }) => {
  return (
    <Router history={history}>
      <HeaderNavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </Router>  
  );
}

export default App;