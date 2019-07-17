import React, { Component } from 'react';
import SnippetDisplay from '../SnippetDisplay/SnippetDisplay';
import SnippetContext from '../../Context/SnippetContext';
import PostSnippetForm from '../PostSnippetForm/PostSnippetForm';
import EditButton from '../Buttons/EditButton';
import PostButton from '../Buttons/PostButton';
import DeleteButton from '../Buttons/DeleteButton';
import './Dashboard.css';

export default class Dashboard extends Component {
  
  static contextType = SnippetContext;

  showSelectedSnippet = () => {
    return (
      !this.context.activePostForm
        ? <section id="dashboard-section">
            <SnippetDisplay snippet={ this.context.selectedSnippet } />
            <div className="main-button-container">
              <div className="left-buttons">
              {
                !this.context.activeEditMode 
                  ? <EditButton toggleEditMode = { this.context.toggleEditMode } />
                  : null
              }
                <DeleteButton 
                  snippet={ this.context.selectedSnippet }
                  deleteSnippet={ this.context.deleteSnippet } 
                  />
              </div>
              <div className="right-buttons">
                <PostButton togglePostForm={ this.context.togglePostForm } />
              </div>
            </div>
          </section>
        
        : <section id="dashboard-section">
            <SnippetDisplay snippet={ this.context.selectedSnippet } />
            <div id='form-container'>
              <PostSnippetForm 
                postSnippet={ this.context.postSnippet }
                toggleForm={ this.context.togglePostForm }
              />
            </div>
          </section>
    )
  }

  render() {  
    return this.showSelectedSnippet();
  }
}