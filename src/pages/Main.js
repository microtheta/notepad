import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MyNotes from './myNotes/myNotes';
import Note from './Note';


const AppRouter = () => (
  <Router>
      <>
      <Route path="/" exact component={MyNotes} />
      <Route path="/:noteId" component={Note} />
      </>
  </Router>
);

export default AppRouter;