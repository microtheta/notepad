import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MyNotes from './myNotes/myNotes';
import Note from './Note';


const AppRouter = () => (
  <Router>
      <Switch>
      <Route path="/" exact component={MyNotes} />
			{/* <Route path="/about" exact component={AboutPage} /> */}
      <Route path="/:noteId" exact component={Note} />
      </Switch>
  </Router>
);

export default AppRouter;
