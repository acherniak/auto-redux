import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => 
  (await fetch('https://jsonplaceholder.typicode.com/posts')).json())

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
  },
  reducers: {
  },
	extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.loaded = true
    }
  }
});

export const selectPosts = state => state.posts.list;

export default postsSlice.reducer;
