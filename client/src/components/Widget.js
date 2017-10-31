import React, { Component } from 'react'

export default class Widget extends Component {
    render () {
        return (
            <div class='widget'>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        )
    }
}