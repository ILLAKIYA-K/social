// /src/App.js
import React from 'react';
import Feed from './components/Feed';
import PostForm from './components/PostForm';
import Profile from './components/Profile';

const App = () => {
  return (
    <div>
      <Profile />
      <PostForm />
      <Feed />
    </div>
  );
};

export default App;

