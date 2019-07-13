import React from 'react';

export default function EditButton(props) {
  const { toggleEditMode, active } = props;
  return active ? null : <button onClick={() => toggleEditMode()}>Edit</button>
}