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
        },
        commentsByPostId: []
    }

    componentDidMount() {
        this.getPostById()
        this.getCommentsByPostId()
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

    getCommentsByPostId = async () => {
        const postId = this.props.match.params.postId
        console.log(this.props)
        try {
            const res = await axios.get(`/api/comment/post/${postId}`)
            const newState = { ...this.state }
            newState.commentsByPostId = res.data
            this.setState(newState)
            console.log(this.state.commentsByPostId)
        } catch (error) {
            console.log('Failed to get all Posts')
            console.log(error)
        }
    }

    deletePostIdComment = async (commentId) => {
        await axios.delete(`/api/comment/${commentId}`)
        this.getPostById()
        this.getCommentsByPostId()
    }

    inputChangeComment = (evt) => {
        const newState = { ...this.state }
        newState.createComment[evt.target.name] = evt.target.value
        this.setState(newState)
        console.log(this.state.createComment)
    }

    postComment = async (evt) => {
        evt.preventDefault()
        let date = `${new Date()}`
        const newState = { ...this.state }
        newState.createComment.date = date
        newState.createComment.user = this.props.userName
        newState.createComment.postId = this.state._id
        this.setState(newState)
        try {
            await axios.post('/api/comment', this.state.createComment)
            this.getPostById()
            this.getCommentsByPostId()
        } catch (error) {
            console.log('Failed to create post')
            console.log(error)
        }

    }

    render() {
        return (
            <div>
                {this.state.isDeletedPost ?
                    <div className="banner">
                        <h2>This Post Has Been Deleted</h2>
                        <p>Any comments attached to this post will need to be reviewed via the <Link to="/comments">All Comments Admin Page</Link></p>
                        <Link to="/posts">To Return to Home, Click Here</Link>
                    </div> :
                    <div className="card">
                        <div className="user">{this.state.user} says:</div>
                        <div className="body">"{this.state.body}"</div>
                        <div className="date">Posted on: {this.state.date}</div>
                        {this.props.userName === 'Admin' ?
                        <div>
                        <button onClick={this.toggleIsEditingPost}>
                            {this.state.isEditingPost ?
                                <div>Cancel Edits</div> :
                                <div>Edit Post</div>}
                        </button>
                        <div> 
                        {this.state.isEditingPost ?
                            <form onSubmit={this.editSubmit}>
                                <div>
                                    <label htmlFor="user">Username: </label>
                                    <input onChange={this.inputChange} type="text" name="user" placeholder={this.state.user} />
                                </div>
                                <div>
                                    <label htmlFor="body">Post Content: </label>
                                    <textarea onChange={this.inputChange} cols="80" rows="10" id="body" name="body"></textarea>
                                </div>
                                <input type="submit" value="Submit Edits" />
                            </form> : null
                        }
                        </div>
                        <button onClick={this.deletePost}>Delete Post</button>
                        </div> :
                        null}
                    </div>
                } 
                <div className="comment-sheet">
                    Comments on this post:
                    <div>
                        {this.state.commentsByPostId.map((comment) => {
                            return (
                                <div className="comment" key={comment._id}>
                                    <div>Commented By: {comment.user}</div>
                                    <div>"{comment.body}"</div>
                                    <div>Posted On: {comment.date}</div>
                                    {this.props.userName === 'Admin' ?
                                    <button onClick={() => this.deletePostIdComment(comment._id)}>Delete Comment</button> :
                                    null}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.props.userName === 'guest' ?
                    <div className="post-button">
                        <div>To make a Comment, Please Choose a Nickname</div>
                        <Link to="/login">Choose Nickname</Link>
                    </div> :
                    <div>
                        <form onSubmit={this.postComment}>
                            <div className="post-form">
                                <label htmlFor="body">Message: </label>
                                <textarea onChange={this.inputChangeComment} cols="80" rows="10" id="body" name="body"></textarea>
                            </div>
                            <input className="post-button" type="submit" value="Post Comment" />
                        </form>
                    </div>
                }
            </div>
        )
    }
}
