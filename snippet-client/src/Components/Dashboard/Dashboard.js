import React, { useContext } from 'react';
import SnippetItem from '../SnippetItem/SnippetItem';
import SnippetContext from '../../Context/SnippetContext';
import './Dashboard.css';

export default function Dashboard() {
  const context = useContext(SnippetContext);
  
  const getClassName = i => {
    const numOfSnippets = Object.keys(context.snippets).length;
    return i === numOfSnippets - 1 ? "snippet-item-last" : "snippet-item";
  };
  
  return (
    <section id="dashboard-section">
      {context.snippets.map((s, i) => {
        return (
          <div className={getClassName(i)} key={i}>
            <SnippetItem snippet={s} />
          </div>
        )
      })}
    </section>
)}