
import jwtFetch from "./jwt";
import { receiveComment, removeComment } from "./trackPost";
import { receiveSessionErrors } from "./session";


export const createComment = (comment, trackId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${trackId}`, {
            method: 'POST',
            body: JSON.stringify(comment)
        })
        if(res.ok) {
            let data = await res.json()
            dispatch(receiveComment([data, trackId]))
        } else {
            throw res 
        }
    } catch (err) {
        let error = await err.json()
        // debugger
        console.log('ERRORS IN COMMENT THUNK', error)
        dispatch(receiveSessionErrors(error)) 
    }
}

export const deleteComment = (commentId, trackId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        })
        debugger
        if(!res.ok) {
            throw res 
        } else {
        
            dispatch(removeComment([trackId, commentId]))
        }
    } catch (error) {
        debugger
        console.log('Comment Deletion Error:', error )
    }   
}
