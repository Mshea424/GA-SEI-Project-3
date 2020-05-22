import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Link to="/posts">Home</Link>
                <Link to="/">My Posts</Link>
                <Link to="/about">About This App</Link>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}
