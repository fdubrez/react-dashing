import React, { Component } from 'react'

export default class Dashboard extends Component {
    render () {
        return (
            <div class="dashboard">
                {this.props.children}
            </div>
        )
    }
}