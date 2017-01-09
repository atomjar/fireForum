import React, { Component } from 'react';
import './App.css';
import base from './config.js'
import { Link } from 'react-router'


class App extends Component {
  constructor(){
    super()
    this.state = {
      forums: []
    }
  }

  componentDidMount() {
  base.fetch('Forums', {
    context: this,
    asArray: true,
    then: (data => {
      this.setState({
        forums: data
      })
    })
  })
}


  render() {
    return (
      <div className="App">
          <h2>Welcome to Green Chat</h2>
          <h3>Get active in these forums:</h3>
          <ul>
            {this.state.forums.map(forum => {
            return (
            <li key={forum}><Link to={forum}>{forum}</Link></li>
            )
            })}
          </ul>
          {this.props.children}
      </div>
    );
  }
}

export default App
