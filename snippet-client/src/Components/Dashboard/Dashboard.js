import React, { Component } from 'react';
import SnippetDisplay from '../SnippetDisplay/SnippetDisplay';
import SnippetContext from '../../Context/SnippetContext';
import PostSnippetForm from '../PostSnippetForm/PostSnippetForm';
import CodeEditor from '../EditSnippet/CodeEditor';
import './Dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formHidden: true,
      editMode: false
    }
  }
  
  static contextType = SnippetContext;

  toggleForm = () => {
    this.setState({ formHidden: !this.state.formHidden });
  }

  showSelectedSnippet = () => {
    return (
      <section id="dashboard-section">    
        <SnippetDisplay snippet={ this.context.selectedSnippet } />
        <div id='form-container'>
          <PostSnippetForm postSnippet={this.context.postSnippet} toggleForm={this.toggleForm} />
        </div>
      </section>
    )
  }

  render() {
    console.log(this.context.selectedSnippet);
    
    return (
      <section id='dashboard-section'>
        {
          <SnippetDisplay snippet={this.context.selectedSnippet} />
        }
      </section>
    )
  }
}