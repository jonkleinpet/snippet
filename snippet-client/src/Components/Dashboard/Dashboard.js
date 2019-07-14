import React, { Component } from 'react';
import SnippetItem from '../SnippetItem/SnippetItem';
import SnippetContext from '../../Context/SnippetContext';
import PostSnippetForm from '../PostSnippetForm/PostSnippetForm';
import './Dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formHidden: true
    }
  }
  
  static contextType = SnippetContext;

  toggleForm = () => {
    this.setState({ formHidden: !this.state.formHidden });
  }

  getClassName = i => {
    const numOfSnippets = Object.keys(this.context.snippets).length;
    return i === numOfSnippets - 1 ? "snippet-item-last" : "snippet-item";
  };

  makeSnippet = () => {
    return (
      <section id="dashboard-section">
        { this.context.snippets.map((s, i) => {
          return (
            <div className={ this.getClassName(i) } key={ i }>
              <SnippetItem snippet={s} />
            </div>
          )
        }) }
        <button onClick={() => this.toggleForm()} id='new-snippet-button'>Add Snippet</button>
      </section>
    )
  }

  makeSnippetForm = () => {
    return (
      <section id="dashboard-section">
        { this.context.snippets.map((s, i) => {
          return (
            <div className={ this.getClassName(i) } key={ i }>
              <SnippetItem snippet={ s } />
            </div>
          )
        }) }
        <div id='form-container'>
          <PostSnippetForm postSnippet={this.context.postSnippet} toggleForm={this.toggleForm} />
        </div>
      </section>
    )
  }

  render() {
    return this.state.formHidden ? this.makeSnippet() : this.makeSnippetForm();
  }
}