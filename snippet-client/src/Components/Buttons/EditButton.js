import React from 'react';
import './EditButton.css';

export default function EditButton(props) {
  const { toggleEditMode, active } = props;
  return active ? null : <button className='edit-button' onClick={() => toggleEditMode()}>Edit</button>
}