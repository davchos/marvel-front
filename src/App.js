import "./App.css";

import Personnages from "./container/Personnages";
import Personnage from "./components/Personnage";
import Comics from "./container/Comics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Personnages />
        </Route>
        <Route exact path="/personnages">
          <Personnages />
        </Route>
        <Route path="/personnage/:id">
          <Personnage />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
