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
    document.getElementById('snippet-form').reset()
    this.resetState();
    this.props.toggleForm();
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
        <button onClick={() => this.props.toggleForm()}>Cancel</button>
        <button type='Submit'>Submit</button>
      </form>
    );
  }
}