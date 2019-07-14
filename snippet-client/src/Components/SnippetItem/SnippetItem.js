import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';
import CodeEditor from '../EditSnippet/CodeEditor';
import Prism from 'prismjs';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import './SnippetItem.css';
import 'prismjs/themes/prism-okaidia.css';

export default class SnippetItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      hidden: true
    }
  }

  static contextType = SnippetContext;

  componentDidUpdate() {
    if (this.state.editMode) {
      Prism.highlightAll();
    }
    if (!this.state.hidden) {
      Prism.highlightAll();
    }
  }

  toggleHidden = () => {
    this.setState({ hidden: !this.state.hidden }, () => {
      if (this.state.editMode) {
        this.toggleEditMode();
      }
    });
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
    return (
      <>
        <h4 onClick={ () => this.toggleHidden() }>{ title }</h4>
        <DeleteButton
          id={id}
          deleteSnippet={ this.context.deleteSnippet }
        />
        {this.displayEditor(content, id)}
        <EditButton
          active={ this.state.editMode }
          toggleEditMode={ this.toggleEditMode }
        />
      </>
    )
  }

  hiddenSnippet = () => {
    const { title, id } = this.props.snippet;
    return (
      <>
        <h4 onClick={() => this.toggleHidden()}>{title}</h4>
        <DeleteButton
          deleteSnippet={ this.context.deleteSnippet }
          id={id}
        />
      </>
    );
  }

  render() {
    return this.state.hidden ? this.hiddenSnippet() : this.shownSnippet()
  }
}