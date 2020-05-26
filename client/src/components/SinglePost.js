import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SinglePost extends Component {

    state = {
        user: '',
        body: '',
        date: '',
        editPost: {
            user: '',
            body: ''
        },
        isEditingPost: false,
        isDeletedPost: false,
        createComment: {
            user: '',
            postId: '',
            body: '',
            date: '',
        }
    }

    componentDidMount() {
        this.getPostById()
    }

    getPostById = async () => {
        const postId = this.props.match.params.postId
        console.log('postid =', postId)
        const res = await axios.get(`/api/post/${postId}`)
        console.log(res.data)
        this.setState(res.data)
        console.log(this.state)
    }

    toggleIsEditingPost = () => {
        this.setState({ isEditingPost: !this.state.isEditingPost })
    }

    inputChange = (evt) => {
        const newState = { ...this.state }
        newState.editPost[evt.target.name] = evt.target.value
        this.setState(newState)
        console.log(this.state.editPost)
    }

    editSubmit = (evt) => {
        evt.preventDefault()
        const postId = this.props.match.params.postId
        console.log(postId)
        axios.put(`/api/post/${postId}`, this.state.editPost)
        this.getPostById()
    }

    deletePost = async () => {
        const postId = this.props.match.params.postId
        await axios.delete(`/api/post/${postId}`)
        await this.setState({ isDeletedPost: !this.state.isDeletedPost })
    }

    render() {
        return (
            <div>
                {this.state.isDeletedPost ?
                    <div>
                        <h2>This Post Has Been Deleted</h2>
                        <Link to="/posts">To Return to Home, Click Here</Link>
                    </div> :
                    <div>
                        <div>{this.state.user}</div>
                        <div>{this.state.body}</div>
                        <div>{this.state.date}</div>

                        <button onClick={this.toggleIsEditingPost}>
                            {this.state.isEditingPost ?
                                <div>Cancel Edits</div> :
                                <div>Edit Post</div>}
                        </button>
                        {this.state.isEditingPost ?
                            <form onSubmit={this.editSubmit}>
                                <div>
                                    <label htmlFor="user">Username: </label>
                                    <input onChange={this.inputChange} type="text" name="user" placeholder={this.state.user} />
                                </div>
                                <div>
                                    <label htmlFor="body">Post Content: </label>
                                    <input onChange={this.inputChange} type="text" name="body" placeholder={this.state.body} />
                                </div>
                                <input type="submit" value="Submit Edits" />
                            </form> : null}
                        <button onClick={this.deletePost}>Delete Post</button>
                    </div>}
                <div>
                    comments
                    </div>
            </div>
        )
    }
}
