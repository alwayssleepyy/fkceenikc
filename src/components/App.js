import React from "react";
import { Router, Route } from "react-router-dom";
//do not use anchor tags inside react-router app, instead use link which gets discerned as anchor anyway but prevents re-requsts/loading. browser dumps all js/old info when u make a new request with anchor. highly inefficient entirely new everything is requested
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  //history object listens for changes to the URL
  //browser router creates its own history object, if we wanna use our own history we should create a plain router for programmatic navigation instead of intentional
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;
