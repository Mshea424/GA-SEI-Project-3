import React, { Component } from 'react'
import{
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'
import AllPosts from './components/AllPosts.js'
import SinglePost from './components/SinglePost.js'
import AllComments from './components/AllComments.js'
import NavBar from './components/NavBar.js'
import About from './components/About.js'
import Login from './components/Login.js'
export default class App extends Component {
  state = {
    userName: 'guest',
  }

  setUserName = (userName) => {
    const newState = { ...this.state }
    newState.userName = userName
    this.setState(newState)
  }

  getLogin = () => {
    return (<Login setUserName = {this.setUserName} />)
  }

  getAllPosts = () => {
    return (<AllPosts userName={this.state.userName} />)
  }

  getSinglePost = () => {
    return (<SinglePost userName={this.state.userName} />)
  }

  getAllComments = () => {
    return (<AllComments userName={this.state.userName} />)
  }



  render() {
    return (
      <div>
        App Page
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/posts" component={this.getAllPosts}/>
            <Route exact path="/posts/:postId" component={SinglePost}/>
            <Route exact path="/comments" component={this.getAllComments}/>
            <Route exact path="/comments/:commentId"></Route>
            <Route exact path="/about" component={About}/>
            <Route exact path="/login" component={this.getLogin}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
