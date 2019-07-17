import React, { Component } from 'react';
import SnippetContext from '../../Context/SnippetContext';
import SnippetListItem from '../SnippetList/SnippetListItem';
import './SidePane.css';

export default class SidePane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }

  static contextType = SnippetContext;

  makeSideWindow = () => {
    return (
      <section id="side-pane-container"> 
        <ul>
          { this.context.snippets.map((s, i) => {
            return (
              <li key={i}>
                <SnippetListItem className={ this.getClassName(i) } snippet={s} />
              </li>
            )
          })
          }
        </ul>
      </section>
    )
  }

  getClassName = i => {
    const numOfSnippets = Object.keys(this.context.snippets).length;
    return i === numOfSnippets - 1 ? "snippet-item-last" : "snippet-item";
  };

  render() {
    return (
      this.makeSideWindow()
    )
  }
}