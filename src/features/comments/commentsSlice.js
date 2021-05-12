import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComms = createAsyncThunk('posts/fetchComms', async () => 
  (await fetch('https://jsonplaceholder.typicode.com/comments')).json())

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    all: [], curComms: []
  },
  reducers: {
		showComms(state, action) { state.postId = action.payload;
			state.curComms = !state.postId? [] : state.all.filter(c=>c.postId === state.postId)
		},
		addComm(state, action) {
			state.curComms.push(Object.assign(action.payload, { postId: state.postId, id: state.all.length+1}))
		}
  },
	extraReducers: {
    [fetchComms.fulfilled]: (state, action) => {
      state.all = action.payload; state.loaded = true
    }
  }
});

export const selectCurComms = state => state.comments.curComms;
export const { showComms, addComm } = commentsSlice.actions

export default commentsSlice.reducer;
