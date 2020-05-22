import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
export default class Login extends Component {

    state = {
        userName: '',
    }

    inputChange = (evt) => {
        const newState = {...this.state}
        newState[evt.target.name] = evt.target.value
        this.setState(newState)
        console.log(this.state.userName)
    }

    formSubmit = (evt) => {
        evt.preventDefault()
        const newState = {...this.state}
        newState.redirect = true
        this.props.setUserName(this.state.userName)
        this.setState(newState)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/posts" />)
        }

        return (
            <div>
                <h1>Choose a NickName</h1>
                <form onSubmit={this.formSubmit}>
                    <div>
                        <label htmlFor="userName">Nickname:</label>
                        <input onChange={this.inputChange} type="text" name="userName"/>
                    </div>
                    <input type="submit" value="Set this as my nickname"/>
                </form>
            </div>
        )
    }
}
