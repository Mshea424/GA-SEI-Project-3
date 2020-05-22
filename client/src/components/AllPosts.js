import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class AllPosts extends Component {

    state = {
        newPost: {
            body: '',
            date: null,
          },
          allPosts: [],
          creatingPost: false,
    }

    toggleCreatingPost = () => {
        this.setState({creatingPost: !this.state.creatingPost})
    }

    render() {
        return (
            <div>
                All Posts
            </div>
        )
    }
}
