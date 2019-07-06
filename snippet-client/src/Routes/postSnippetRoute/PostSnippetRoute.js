import React from 'react';
import PostSnippetForm from '../../Components/PostSnippetForm/PostSnippetForm';
import {SnippetProvider} from '../../Context/SnippetContext';

export default function PostSnippetRoute() {
  return (
    <>
      <SnippetProvider>
        <PostSnippetForm />
      </SnippetProvider>
    </>
  )
}