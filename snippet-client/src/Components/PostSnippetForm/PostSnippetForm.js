import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';
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

  static contextType = SnippetContext;

  updateContent = (content) => {
    this.setState({ content });
  }

  updateTitle = (title) => {
    this.setState({ title });
  }

  resetState = () => {
    this.setState({ title: '', content: '' });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.context.postSnippet(this.state.content, this.state.title)
      document.getElementById('snippet-form').reset()
      this.resetState()
  }

  render() {
    return(
      <form id="snippet-form" onSubmit={ (e) => this.handleSubmit(e) }>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" onChange={(e) => this.updateTitle(e.target.value)} />
        <textarea
          cols="40"
          rows="20"
          onChange={(e) => this.updateContent(e.target.value)}
        />
        <button type='Submit'>Submit</button>
      </form>
    );
  }
}