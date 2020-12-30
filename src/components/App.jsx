import { React } from "react";
import { Router, Route, Switch } from "react-router";
import Home from "pages/Home";

export const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>  
  );
}

export default App;