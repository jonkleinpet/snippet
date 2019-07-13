import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css";


export default class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { code: '' };
  }

  componentDidMount() {
    this.setState({ code: this.props.code })
    console.log(this.props);
    
  }

  handleSubmit = (e) => {
    const { editSnippet, toggleEditMode, id } = this.props;
    e.preventDefault();
    editSnippet(this.state.code, id);
    toggleEditMode();
  }

  render() { 
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <Editor
          className="language-javascript"
          value={this.state.code}
          onValueChange={ code => this.setState({ code }) }
          highlight={ code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14
          }}
        />
        <button>Submit</button>
      </form>
    );
  }
}