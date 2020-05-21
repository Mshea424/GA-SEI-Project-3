import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AllPosts from './components/AllPosts.js'
import SinglePost from './components/SinglePost.js'

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <h1>Hello World</h1>
        <Router>

          <Switch>

            <Route exact path="/posts" >
              <AllPosts />
            </Route>

            <Route exact path="/posts/:postId" component={SinglePost} />

          </Switch>

        </Router>
      </div>
    )
  }
}

export default App;
