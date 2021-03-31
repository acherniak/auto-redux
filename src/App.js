import React from 'react';
import { PostList } from './features/posts/PostList';
import { Comments } from './features/comments/Comments';

function App() {
	return (
		<div className="flex h100">
  		<PostList/>
  		<Comments/>
		</div>
  );
}

export default App;
