import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchComms, selectCurComms, addComm } from './commentsSlice'

export function Comments() {

	const loaded = useSelector(state => state.posts.loaded),
		curComms = useSelector(selectCurComms),
		dispatch = useDispatch(), flds = ['name', 'email', 'body'],
		addNew = () => { let obj = {}; 
			for (let fld of flds) 
				{ let el = document.getElementById(fld); obj[fld] = el.value; el.value = ''; }
			dispatch(addComm(obj));
		}

	useEffect(() => { if (!loaded) { dispatch(fetchComms()) }	})

	return !curComms.length? '':(
		<div className="panel">
			<div className="capt">{curComms.length} Comments</div>
			<div className="flex1 scroll">
				{ curComms.map((c)=>(<div key={c.id} className="comm">
					<div className="flex"><b className="flex1">{c.name}</b><i>{c.email}</i></div>
					<div>{c.body}</div>
				</div>))}
			</div>
			<div>
				<button onClick={addNew}>Save</button>
				{ flds.map(fld=><label className="flex m10"><div className="w60">{fld}</div><input className="flex1" id={fld}/></label>) }
			</div>
		</div>
	)
}