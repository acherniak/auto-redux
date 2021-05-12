import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, selectPosts } from './postsSlice'
import { showComms } from '../comments/commentsSlice'

export function PostList() {
	const [cur, setCur] = useState(0),
		loaded = useSelector(state => state.posts.loaded),
		dispatch = useDispatch(),
		posts = useSelector(selectPosts)

	useEffect(() => { if (!loaded) { dispatch(fetchPosts()) }	})

	return (
		<div className="panel">
			<div className="flex"><a href="React Code Challenge.pdf" target="_blank">task</a><div className="capt flex1">{posts.length} Posts</div></div>
			<div className="flex1 scroll">
				{ posts.map((p)=>
					<div key={p.id} className={`post ${p.id===cur?'select':''}`}
							onClick={()=> { let id = cur===p.id?undefined:p.id; setCur(id); dispatch(showComms(id)) } }>
						<b>{p.title}</b>
						<div>{p.body}</div>
					</div>
				)}
			</div>
		</div>
	)
}