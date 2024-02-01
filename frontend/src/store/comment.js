
import jwtFetch from "./jwt";
// import { getTrack } from "./trackPost";
import { createSlice } from "@reduxjs/toolkit";



export const createComment = (comment) => async dispatch => {
    // debugger
    try {
        const res = await jwtFetch(`api/comments/${comment.trackId}`, {
            method: 'POST',
            body: JSON.stringify(comment)
        })
        if(res.ok) {
            dispatch(receiveComment(comment))
        } else {
            throw res 
        }
    } catch (err) {
        console.log('ERRORS IN COMMENT THUNK', err)
    }
}



const commentsReducer = createSlice({
    name: 'comments',
    initialState: {},
    reducers: {
        receiveComments: (state, action) => {
            console.log('IN COMMENTS REDUCER', action.payload)
            return {...state, ...action.payload}
        },
        receiveComment: (state, action) => {
            state[action.comment._id] = action.comment
        }
    }
})

export default commentsReducer