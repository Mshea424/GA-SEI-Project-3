import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                
                <Link to="/posts">{this.props.userName === 'Admin' ? 'All Posts' : 'Home'}</Link>
                {this.props.userName === 'Admin' ?
                <Link to="/comments">All Comments</Link> :
                null}
                <Link to="/about">{this.props.userName === 'Admin' ? 'You Already know About This App' : 'About This App'}</Link>
                <Link to="/login">{this.props.userName === 'Admin' ? 'Leave Admin View' : 'Change Nickname'}</Link>
                
            </div>
        )
    }
}
