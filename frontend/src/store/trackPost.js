import jwtFetch from './jwt';
import { createSlice } from '@reduxjs/toolkit'


export const getTracks = () => async dispatch => {
        const res = await jwtFetch('api/trackPosts');
        const tracks = await res.json()
        dispatch(receiveTracks(tracks))
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
        trackPost
        })
    } catch (error) {
        console.log(error)
    }
}


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

export default trackPostsSlice.reducer