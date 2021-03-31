import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComms = createAsyncThunk('posts/fetchComms', async () => 
  (await fetch('https://jsonplaceholder.typicode.com/comments')).json())

let postId;

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    all: [], curComms: []
  },
  reducers: {
		showComms(state, action) { postId = action.payload
			state.curComms = !postId? [] : state.all.filter(c=>c.postId === postId)
		},
		addComm(state, action) {
			state.curComms.push(Object.assign(action.payload, { postId, id: state.all.length+1}))
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
