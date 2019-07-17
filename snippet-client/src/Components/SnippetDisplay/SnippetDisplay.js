import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';
import CodeEditor from '../EditSnippet/CodeEditor';
import Prism from 'prismjs';
import './SnippetDisplay.css';
import 'prismjs/themes/prism-okaidia.css';

export default class SnippetDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  componentDidUpdate() {
    if (this.state.editMode) {
      Prism.highlightAll();
    }
    if (!this.state.hidden) {
      Prism.highlightAll();
    }
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  displayEditor = (content, id) => {
    if (this.state.editMode) {
      return (
        <pre>
          <CodeEditor
            id={ id }
            code={ content }
            editSnippet={ this.context.editSnippet }
            toggleEditMode={ this.toggleEditMode }
          />
        </pre>
      )
    }
    return (
      <pre>
        <code className={'language-javascript'}>{ content }</code>
      </pre>
    )
  }

  shownSnippet = () => {
    const { content, title, id } = this.props.snippet;
    console.log(this.props.snippet);
    
    return (
      <>
        <h4>{ title }</h4>
        {this.displayEditor(content, id)}
      </>
    ) 
  }

  snippetReadyCheck = () => {
    return !this.props.snippet ? false : true
  }

  hiddenSnippet = () => {
    const { title, id } = this.props.snippet;
    return (
      <>
        <h4 onClick={() => this.toggleHidden()}>{title}</h4>
      </>
    );
  }

  render() {
    return (
      !this.snippetReadyCheck()
        ? null
        : <pre>
            <code className={ 'language-javascript' }>{ this.props.snippet.content }</code>
          </pre>
    )
  }
}