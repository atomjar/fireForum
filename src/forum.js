import React, { Component } from 'react';
import base from './config'

class Forum extends Component {
  constructor () {
    super()
    this.state = {
      forum: [],
      user: "",
      room: []
    }
  }

  componentDidMount () {
      base.fetch(`${this.props.params.forum}`, {
        context: this,
        then: (data) => {
          this.setState({
            forum: data
          })
        }
      })
      this.sync = base.syncState(`${this.props.params.forum}/room`, {
        state: 'room',
        context: this,
        asArray: true
      })
    }

    componentWillReceiveProps (nextProps) {
      base.fetch(`${nextProps.params.forum}`, {
        context: this,
        then: (data) => {
          this.setState({
            forum: data
          })
        }
      })
    this.sync = base.syncState(`${nextProps.params.forum}/room`, {
      state: 'room',
      context: this,
      asArray: true
    })

  }

  signUp () {
    var password = this.password.value
    if (password.length < 6) {
     alert('Password must be 6 or more characters')
    } else {
     base.createUser({
        email: this.email.value,
        password: this.password.value
      }, this.authStateChanged.bind(this))
    }
      // this.email.value = ''
      // this.password.value = ''
    }


   signIn(){
     base.authWithPassword({
       email: this.email.value,
       password: this.password.value
     }, this.authStateChanged.bind(this))
    //  this.email.value = ''
    //  this.password.value = ''
   }


   signOut(){
     base.unauth(this.authStateChanged.bind(this))
   }


   authStateChanged (error, user) {
    if (error) {
      alert('wrong password')
    } else if (user){
          this.setState({
            user: this.email.value
          })
        }
      }


    addPost (event) {
      event.preventDefault()
      let newPost = {
        post: this.post.value,
        user: `${this.email.value}`, //needs to pull down from firebase directly
        // time: new Date ()
      }
      let newPostArray = this.state.room.concat(newPost)
      this.setState({
        room: newPostArray
      })
      this.post.value = ''
    }

    deletePost (clickedPost) {
      var newRoom = this.state.room.filter(post => post !==clickedPost)
      this.setState({
        room: newRoom
      })
    }


  render() {
    return (
      <div>
        <form>
           <input
              ref={node => this.email = node}
              placeholder="email" />
           <input
              ref={node => this.password = node}
              placeholder="password"
              type='password' />
           <button
              // hidden={!this.state.user}
              type="submit"
              onClick={this.signUp.bind(this)}>Sign up with us!</button>
           <button
              // hidden={!this.state.user}
              type="submit"
              onClick={this.signIn.bind(this)}>Sign in!</button>
           <button
              // hidden={!this.state.user}
              type="submit"
              onClick={this.signOut.bind(this)}>Sign out!</button>
        </form>
        <ul>
          {this.state.room.map((forum, index) => {
            return <li key={index}>
                    {forum.user}: {forum.post}, {forum.time}
                    <button ref={button => this.button = button}
                      onClick={this.deletePost.bind(this)}>Delete
                    </button>
                    </li>
          })
          }
        </ul>
        <form hidden={!this.state.user}>
            <input
              placeholder="Type post"
              ref={node => this.post = node} />
            <button
              onClick={this.addPost.bind(this)}>Post
            </button>
        </form>
      </div>
    )
  }


}

export default Forum
