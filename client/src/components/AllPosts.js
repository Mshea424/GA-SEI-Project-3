import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
        this.setState({ creatingPost: !this.state.creatingPost })
        console.log(this.state.creatingPost)
    }

    render() {
        return (
            <div>
                <h1>All Posts</h1>

                <div>
                    {this.state.allPosts.map(() => {
                        return (
                            <div>

                            </div>
                        )
                    })}
                </div>

                <div>
                    {this.props.userName === 'guest' ?
                        <div>
                            <div>To make your own post, Please Choose a Nickname</div>
                            <Link to="/login">Choose Nickname</Link>
                        </div> :

                        <div onClick={this.toggleCreatingPost}>
                            {this.state.creatingPost ?
                                <div>Cancel this Form</div> :
                                <div>Post New Message</div>}
                        </div>}
                </div>
                {this.state.creatingPost ?
                <div>
                    Create Post Form
                </div> 
                : null}                    
            </div>
        )
    }
}
