import React, { Component } from 'react'
import axios from 'axios'
export default class AllComments extends Component {

    state = {
        newComment: {
            user: '',
            postId: '',
            body: '',
            date: '',
        },
        allComments: [],
    }

    componentDidMount() {
        this.getAllComments()
        console.log(this.props.userName)
    }

    getAllComments = async () => {
        try {
            const res = await axios.get('/api/comment')
            const newState = { ...this.state }
            newState.allComments = res.data
            this.setState(newState)
            console.log(this.state.allComments)
        } catch (error) {
            console.log('Failed to get all Posts')
            console.log(error)
        }
    }

    deleteComment = async (commentId) => {
        await axios.delete(`/api/comment/${commentId}`)
        this.getAllComments()
    }

    render() {
        return (
            <div>

                <div>
                    {this.state.allComments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <div>Post ID: {comment.postId}</div>
                                <div>Commented by: {comment.user}</div>
                                <div>{comment.body}</div>
                                <div>{comment.date}</div>
                                <button onClick={() => this.deleteComment(comment._id)}>Delete this Comment</button>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}
