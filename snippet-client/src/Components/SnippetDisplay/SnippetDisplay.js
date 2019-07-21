import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';
import CodeEditor from '../EditSnippet/CodeEditor';
import Prism from 'prismjs';
import './SnippetDisplay.css';
import 'prismjs/themes/prism-okaidia.css';

export default class SnippetDisplay extends Component {

  static contextType = SnippetContext;

  componentDidUpdate() {
    if (this.context.activeEditMode) {
      Prism.highlightAll();
    }
    if (!this.context.activeEditMode) {
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
    if (this.context.activeEditMode) {
      return (
        <pre>
          <CodeEditor
            id={ id }
            code={ content }
            editSnippet={ this.context.editSnippet }
            toggleEditMode={ this.context.toggleEditMode }
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

  snippetReadyCheck = () => {
    return !this.props.snippet ? false : true
  }

  render() {
    
    return (

      !this.snippetReadyCheck()
        ? null
        : this.displayEditor(this.props.snippet.content, this.props.snippet.id)
    )
  }
}