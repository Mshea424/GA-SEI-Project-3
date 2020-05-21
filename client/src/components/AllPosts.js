import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class AllPosts extends Component {

    state = {
        newPost: {
            user: '',
            body: '',
        },
        allPosts: [],
        creatingPost: false
    }
    
    toggleCreatePost = () => {
        this.setState({creatingPost: !this.state.creatingPost})
    }

    componentDidMount() {
        this.getAllPosts()
    }

    getAllPosts = async () => {
        try {
            const res = await axios.get('/api/post')
            const newState = { ...this.state }
            newState.allPosts = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all posts')
            console.log(error)
        }
    }

    onChangePost = (evt) => {
        const newState = { ...this.state }
        newState.newPost[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onDeletePost = async (postId) => {
        await axios.delete(`/api/post/${postId}`)
        this.getAllPosts()
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/post', this.state.newPost)
            this.getAllPosts()
        } catch (error) {
            console.log('Failed to create post')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h1>All Posts</h1>
                {this.state.allPosts.map((post) => {
                    return (
                        <div>
                            <Link to={`/posts/${post._id}`}>
                                <div>{post.body}</div>
                            </Link>
                            <div>{post.user}</div>
                            <div>{post.body}</div>
                            <button onClick={() => this.onDeletePost(post._id)}>Delete</button>
                        </div>
                    )
                })}

            <button onClick={this.toggleCreatePost}>{this.state.creatingPost ? <div>Close Form</div> : <div>Submit New Post</div>}</button>

                {this.state.creatingPost ?
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="user">User</label>
                        <input
                            type="text"
                            name="user"
                            value={this.state.newPost.name}
                            onChange={this.onChangePost} />
                    </div>

                    <div>
                        <label htmlFor="body">Body</label>
                        <input
                            type="text"
                            name="body"
                            value={this.state.newPost.description}
                            onChange={this.onChangePost} />
                    </div>

                    <input type="submit" value="Create" />
                </form> : null
                }


            </div>
        )
    }
}
