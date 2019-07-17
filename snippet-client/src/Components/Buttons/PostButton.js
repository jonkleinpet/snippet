import React from 'react';
import './Buttons.css';

export default function PostButton(props) {
  const { togglePostForm } = props;
  return <button className="post-button" onClick={ () => togglePostForm() }>Add Snippet</button>
  
}