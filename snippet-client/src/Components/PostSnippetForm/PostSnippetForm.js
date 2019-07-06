import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';
import './PostSnippetForm.css';

export default class PostSnippetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      validForm: null,
      message: ''
    }
  }

  static contextType = SnippetContext;

  updateContent = (content) => {
    this.setState({content});
  }

  validateForm = () => {
    let isValid = true;
    let message = '';
    const {content} = this.state;

    if (!content.length) {
      isValid = false;
      message = 'cannot submit empty note';
      return this.setState({validForm: isValid, message});
    }
    this.setState({validForm: isValid, message});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.validateForm();
    this.context.postSnippet(this.state.content);
  }

  render() {
    return(
      <form id="snippet-form" onSubmit={(e) => this.handleSubmit(e)}>
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