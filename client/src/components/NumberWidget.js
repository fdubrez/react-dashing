import React, { Component } from 'react'
import Widget from './Widget'

export default class NumberWidget extends Component {
  render () {
    let value
    let difference
    if (this.props.data.hasOwnProperty(this.props.id)) {
      value = parseInt(this.props.data[this.props.id].current)
    }
    if (value && this.props.data[this.props.id].hasOwnProperty("last")) {
      const last = parseInt(this.props.data[this.props.id].last)
      let glyph
      if (value > last) {
        glyph = 'up'
      } else if (value === last) {
        glyph = 'right'
      } else {
        glyph = 'down'
      }
      difference.glyph = glyph
    }
    return (
      <Widget className="widget-number" title={this.props.title}>
        <div>
          <h2 className="value">{value | "No data"}</h2>
          <p key={1} className="change-rate"> 
            <Glyphicon glyph={`arrow-${difference.glyph}`} />
          </p>
          <p key={2} className="more-info">{this.props.moreInfo}</p>
          <p key={3} className="updated-at">Last updated at { new Date().toLocaleTimeString().substr(0,5)}</p>
        </div>
      </Widget>
    )
  }
}