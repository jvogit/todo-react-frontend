import { React } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import { HeaderNavBar } from "components/navbar/HeaderNavBar";

export const App = ({ history }) => {
  return (
    <Router history={history}>
      <HeaderNavBar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>  
  );
}

export default App;