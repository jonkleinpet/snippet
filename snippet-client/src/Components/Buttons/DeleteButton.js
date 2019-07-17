import React from 'react';
import './DeleteButton.css'

export default function DeleteButton(props) {
  const { deleteSnippet, id } = props;
  return <button className='delete-button' onClick={() => deleteSnippet(id)}>Delete</button>
}