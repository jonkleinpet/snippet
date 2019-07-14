import React, {Component, createContext} from 'react';
import apiService from '../services/apiService';

const SnippetContext = createContext({
  snippets: [],
  postSnippet: () => { },
  getSnippets: () => { },
  editSnippet: () => { }
});

export default SnippetContext;

export class SnippetProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snippets: []
    }
  }

  postSnippet = (content, title) => {
    apiService
      .postSnippet(content, title)
      .then(res => this.updateSnippets(res));
  }

  getSnippets = () => {
    apiService
      .getSnippets()
      .then(snippets => {
        if (!snippets.message) {
          return this.updateSnippets(snippets);
        }
        return;
      });
  }

  editSnippet = (content, id) => {
    apiService
      .editSnippet(content, id)
      .then(snippets => this.updateSnippets(snippets))
  }

  updateSnippets = (snippets) => {
    this.setState({ snippets });
  }
  
  async componentDidMount() {
    const snippets = await apiService.getSnippets();
    this.updateSnippets(snippets);
  }
  
  render() {
    const value = {
      snippets: this.state.snippets,
      postSnippet: this.postSnippet,
      getSnippets: this.getSnippets,
      editSnippet: this.editSnippet
    }
    return(
      <SnippetContext.Provider value={value}>
        {this.props.children}
      </SnippetContext.Provider>
    )
  }

}