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

    componentDidMount() {
        console.log(this.props.userName)
      }

    toggleCreatingPost = () => {
        this.setState({creatingPost: !this.state.creatingPost})
        console.log(this.state.creatingPost)
    }

    render() {
        return (
            <div>
                All Posts
                <div onClick={this.toggleCreatingPost}>
                    {this.state.creatingPost ?
                        <div>Cancel this Form</div> :
                        <div>Post New Message</div>}
                </div>

            </div>
        )
    }
}
