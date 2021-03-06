import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import SavedArticles from "./pages/SavedArticles";
import Error from "./pages/Error";
import Nav from './components/Nav';




const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/savedArticles" component={SavedArticles} />
        <Route component={Error}/>
      </Switch>
    </div>
  </Router>;


export default App;
