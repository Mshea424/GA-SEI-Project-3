import React, { Component } from 'react'
import axios from 'axios'
export default class AllComments extends Component {

    state = {
        newComment: {
            user: '',
            postId:'',
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
            const newState = {...this.state}
            newState.allComments = res.data
            this.setState(newState)
            console.log(this.state.allComments)
        } catch (error) {
            console.log('Failed to get all Posts')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                
                <div>
                    {this.state.allComments.map((comment) => {
                        return (
                            // <Link to={`/comments/${comment._id}`}>
                                <div key={comment._id}>
                                    <div>{comment.user}</div>
                                    <div>{comment.postId}</div>
                                    <div>{comment.body}</div>
                                    <div>{comment.date}</div>
                                </div>
                            // </Link>
                        )
                    })}
                </div>

            </div>
        )
    }
}
