import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class AllPosts extends Component {

    state = {
        newPost: {
            user: '',
            body: '',
            date: '',
        },
        allPosts: [],
        creatingPost: false,
    }

    componentDidMount() {
        this.getAllPosts()
        console.log(this.props.userName)
    }

    getAllPosts = async () => {
        try {
            const res = await axios.get('/api/post')
            const newState = {...this.state}
            newState.allPosts = res.data
            this.setState(newState)
            console.log(this.state.allPosts)
        } catch (error) {
            console.log('Failed to get all Posts')
            console.log(error)
        }
    }

    toggleCreatingPost = () => {
        this.setState({ creatingPost: !this.state.creatingPost })
        console.log(this.state.creatingPost)
    }

    postInputChange = (evt) => {
        const newState = {...this.state}
        newState.newPost[evt.target.name] = evt.target.value
        this.setState(newState)
        console.log(this.state.newPost)
    }

    postSubmit = async (evt) => {
        evt.preventDefault()
        let date = `${new Date()}`
        const newState = {...this.state}
        newState.newPost.date = date
        newState.newPost.user = this.props.userName
        this.setState(newState)
        try{
            await axios.post('api/post', this.state.newPost)
            this.getAllPosts()
        } catch (error) {
            console.log('Failed to create post')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <div className="banner">
                    <h1>{this.props.userName === 'Admin' ? 'Welcome, all Mighty & Powerful ADMIN!' : `Welcome to our message board, ${this.props.userName}!`}</h1>
                </div>
                <div>
                    {this.state.allPosts.map((post) => {
                        return (
                            <Link className="card-content" to={`/posts/${post._id}`}>
                                <div className="card" key={post._id}>
                                    <div className="user">{post.user} says:</div>
                                    <div className="body">"{post.body}"</div>
                                    <div className="date">Posted on: {post.date}</div>
                                    {this.props.userName === 'Admin' ?
                                    <div>Click to View & Edit</div> :
                                    null}
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div>
                    {this.props.userName === 'guest' ?
                        <div className="post-button">
                            <div>To make your own post, Please Choose a Nickname</div>
                            <Link to="/login">Choose Nickname</Link>
                        </div> :

                        <div onClick={this.toggleCreatingPost}>
                            {this.state.creatingPost ?
                                <div className="post-button">Cancel this Form</div> :
                                <div className="post-button">Post New Message</div>}
                        </div>}
                </div>
                {this.state.creatingPost ?
                <div>
                    <form onSubmit={this.postSubmit}>
                        <div className="post-form">
                        <label htmlFor="body">Message:</label>
                        <input onChange={this.postInputChange} type="text" name="body" value={this.state.newPost.body}/>
                        </div>
                        <input className="post-button" type="submit" value="Post Message"/>
                    </form>
                </div> 
                : null}                    
            </div>
        )
    }
}
