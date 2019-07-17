import React, {Component, createContext} from 'react';
import apiService from '../services/apiService';

const SnippetContext = createContext({
  snippets: [],
  selectedSnippet: null,
  activeEditMode: false,
  activePostForm: false,
  selectSnippet: () => { },
  postSnippet: () => { },
  getSnippets: () => { },
  editSnippet: () => { },
  deleteSnippet: () => { },
  toggleEditMode: () => { },
  togglePostForm: () => { }
});

export default SnippetContext;

export class SnippetProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snippets: [],
      selectedSnippet: null,
      activeEditMode: false,
      activePostForm: false
    }
  }

  toggleEditMode = () => {
    this.setState({ activeEditMode: !this.state.activeEditMode })
  }

  togglePostForm = () => {
    this.setState({ activePostForm: !this.state.activePostForm })
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
          this.updateSnippets(snippets);
        } else {
          return;
        }
      });
  }

  selectSnippet = (id) => {
    let snippet = {};
    this.state.snippets.forEach(s => {
      if (s.id === id) {
        snippet = s;
      }
    }) 
    this.setState({selectedSnippet: snippet})
  }

  editSnippet = (content, id) => {
    apiService
      .editSnippet(content, id)
      .then(snippets => this.updateSnippets(snippets));
  }

  updateSnippets = (snippets) => {
    this.setState({ snippets, selectedSnippet: snippets[0] });
  }

  deleteSnippet = (id) => {
    apiService
      .deleteSnippet(id)
      .then(snippets => this.updateSnippets(snippets));
  }
  
  async componentDidMount() {
    const snippets = await apiService.getSnippets();
    this.updateSnippets(snippets);
  }
  
  render() {
    const value = {
      snippets: this.state.snippets,
      selectedSnippet: this.state.selectedSnippet,
      activeEditMode: this.state.activeEditMode,
      activePostForm: this.state.activePostForm,
      selectSnippet: this.selectSnippet,
      postSnippet: this.postSnippet,
      getSnippets: this.getSnippets,
      editSnippet: this.editSnippet,
      deleteSnippet: this.deleteSnippet,
      toggleEditMode: this.toggleEditMode,
      togglePostForm: this.togglePostForm
    }
    return(
      <SnippetContext.Provider value={value}>
        {this.props.children}
      </SnippetContext.Provider>
    )
  }

}