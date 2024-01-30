import jwtFetch from './jwt';
import { createSlice } from '@reduxjs/toolkit'



export const getTracks = () => async dispatch => {
    try {
        const res = await jwtFetch('api/trackPosts');
        if(res.ok) {
            const tracks = await res.json()
            dispatch(receiveTracks(tracks))
        }
    } catch (err) {
        let errors = err.json()
        dispatch()
    }
}

export const getTrack = (trackId) => async dispatch => {
        const res = await jwtFetch(`api/trackPosts/${trackId}`);
        const track = await res.json()
        dispatch(receiveTrack(track))
}

export const createTrack = (trackPost) => async dispatch => {
    try {
        const res = await jwtFetch(`api/trackPosts`, {
        method: "POST",
        body: trackPost
        })
    } catch (error) {
        console.log(error)
    }
}


export const trackErrorsSlice = createSlice({
    name: 'trackErrors',
    initialState: {errors: null},
    reducers: {
        recieveErrors: (state, action) => {
            state.errors = action.errors
        },
        clearErrors: (state, action) => {
            state.errors = null 
        }
    }
})


const trackPostsSlice = createSlice({
    name: 'trackPosts',
    initialState: {},
    reducers: {
        receiveTracks: (state, action) => {
            state.trackPosts = action.trackPosts
        },
        receiveTrack: (state, action) => {
            state.trackPosts[trackPost.id] = action.trackPost 
        },
        clearTracks: (state, action) => {
            state.trackPosts = {}
        }
    }
})

export const {receiveTracks, receiveTrack, clearTracks} = trackPostsSlice.actions

export const trackErrorsReducer = trackErrorsSlice.reducer

export default trackPostsSlice.reducer