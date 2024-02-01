
import jwtFetch from "./jwt";
import { receiveComment } from "./trackPost";
import { receiveSessionErrors } from "./session";

export const createComment = (comment, trackId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${trackId}`, {
            method: 'POST',
            body: JSON.stringify(comment)
        })
        if(res.ok) {
            debugger
            let data = await res.json()
            dispatch(receiveComment([data, trackId]))
        } else {
            throw res 
        }
    } catch (err) {
        let error = await err.json()
        debugger
        console.log('ERRORS IN COMMENT THUNK', error)
        dispatch(receiveSessionErrors(error)) 
    }
}



// const commentsSlice = createSlice({
//     name: 'comments',
//     initialState: {},
//     reducers: {
//         receiveComments: (state, action) => {
//             console.log('IN COMMENTS REDUCER', action.payload)
//             return {...state, ...action.payload}
//         },
//         receiveComment: (state, action) => {
//             state[action.payload[1]] = action.payload
//         }
//     }
// })

// export const {receiveComment, receiveComments} = commentsSlice.actions

// export default commentsSlice.reducer 