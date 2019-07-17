import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';

export default class SnippetListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  static contextType = SnippetContext;

  select = (id) => {
    this.context.selectSnippet(id);
  }

  makeList = () => {
    const { snippet } = this.props;
    return (
      <ul>
        <li onClick={ () => this.select(snippet.id) }>{ snippet.title }</li>
      </ul>
    )
  }

  render() {
    return this.makeList();
  }
}