import React, { Component } from 'react'
import axios from 'axios'

export default class SinglePost extends Component {

    state = {
        user: '',
        body: '',

        updatePost: {
            user: '',
            body: '',
        },
    }

    componentDidMount() {
        this.getPostById()
    }

    getPostById = async () => {
        const postId = this.props.match.params.postId
        console.log('postId', postId)
        const res = await axios.get(`/api/post/${postId}`)
        this.setState(res.data)
    }

    onChangeUpdatePost = (evt) => {
        const newState = { ...this.state}
        newState.updatePost[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmitUpdate = async (evt) => {
        evt.preventDefault()
        try {
            const postId = this.props.match.params.postId
            await axios.put(`/api/post/${postId}`, this.state.updatePost)
            this.getPostById()
        } catch (error) {
            console.log('Failed to create post')
            console.log(error)
        }
    }

    render() {

        return (
            <div>
                <h1>Single Post</h1>
                <div>User: {this.state.user}</div>
                <div>Body: {this.state.body}</div>


                <form onSubmit={this.onSubmitUpdate}>
                    <div>
                        <label htmlFor="user">User</label>
                        <input
                            type="text"
                            name="user"
                            value={this.state.user}
                            onChange={this.onChangeUpdatePost} />
                    </div>

                    <div>
                        <label htmlFor="body">Body</label>
                        <input
                            type="text"
                            name="body"
                            value={this.state.body}
                            onChange={this.onChangeUpdatePost} />
                    </div>

                    <input type="submit" value="Update" />
                </form>


            </div>
        )
    }
}
