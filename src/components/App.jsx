import { React } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import HeaderNavBar from "components/navbar/HeaderNavBar";
import AuthorizedRoute from "components/routes/AuthorizedRoute";
import Todos from "pages/Todos";

export const App = ({ history }) => {
  return (
    <Router history={history}>
      <HeaderNavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <AuthorizedRoute path="/todos" exact component={Todos} />
      </Switch>
    </Router>  
  );
}

export default App;