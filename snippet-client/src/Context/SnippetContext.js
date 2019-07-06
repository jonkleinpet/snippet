import React, {Component, createContext} from 'react';
import apiService from '../services/apiService';

const SnippetContext = createContext({
  snippets: [],
  postSnippet: () => {},
  getSnippets: () => {}
})

export default SnippetContext;

export class SnippetProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snippets: []
    }
  }

  postSnippet = (content) => {
    apiService
      .postSnippet(content)
      .then(res => {
        this.updateSnippets(res);
      });
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

  updateSnippets = (snippets) => {
    this.setState({snippets})
  }
  
  async componentDidMount() {
    const snippets = await apiService.getSnippets();
    this.updateSnippets(snippets);
  }
  
  render() {
    const value = {
      snippets: this.state.snippets,
      postSnippet: this.postSnippet,
      getSnippets: this.getSnippets
    }
    return(
      <SnippetContext.Provider value={value}>
        {this.props.children}
      </SnippetContext.Provider>
    )
  }

}