import React from 'react';
import './Buttons.css'

export default function DeleteButton(props) {
  const { deleteSnippet, snippet } = props;
  return <button className='delete-button' onClick={() => deleteSnippet(snippet.id)}>Delete</button>
}