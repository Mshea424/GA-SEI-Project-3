import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
                <p className="card">The purpose of this app is mostly to have fun. It operates similarly to a game of 'chinese telephone'. <br/>
                The layout is set up similarly to a message posting board with the ability to choose a username, post <br/> 
                messages, & comment on your own, or other's messages. The catch, is that when you submit your post, <br/>
                it gets sent to google's translate API, & is translated through 6 different languages, before being <br/>
                converted back into English & posted. This results in a noticeably different post than what was submitted, <br/>
                hence the name, "lost in Translation!". Have Fun!<br/>
                <br/>
                --PS: If you've had enough fun & want to turn on God powers (or if one of your posts landed outside your comfort zone)<br/>
                you can enable Admin View by simply changing your Nickname to 'Admin', via the top nav bar. this will give you the ability<br/>
                to edit or delete any of your posts/comments, or anyone else's. And, for that reason, I will not claim any responsibility for what might<br/>
                be posted on this forum. Everyone is a god here! What could go wrong? <br/>
                <br/>
                Languages Used: English, Russian, Afrikaans, Mandarin Chinese, Icelandic, Hebrew, Hindi, Swahili, Hawaiian
                </p>
            </div>
        )
    }
}
