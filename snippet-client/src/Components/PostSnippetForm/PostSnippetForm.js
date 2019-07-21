import React, { Component } from 'react';
import './PostSnippetForm.css';

export default class PostSnippetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      title: '',
      validForm: null,
      message: ''
    }
  }

  updateContent = (content) => {
    this.setState({ content });
  }

  updateTitle = (title) => {
    this.setState({ title });
  }

  resetState = () => {
    this.setState({ title: '', content: '' });
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.postSnippet(this.state.content, this.state.title)
    document.getElementById('post-snippet-form').reset()
    this.resetState();
    this.props.toggleForm();
  }

  render() {
    return(
      <form name="post-snippet-form" id="post-snippet-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" onChange={(e) => this.updateTitle(e.target.value)} />
        <textarea
          cols="100"
          rows="30"
          onChange={(e) => this.updateContent(e.target.value)}
        />
        <button htmlFor="post-snippet-form" type='Submit'>Submit</button>
        <button onClick={() => this.props.toggleForm()}>Cancel</button>
      </form>
    );
  }
}