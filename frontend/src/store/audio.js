import jwtFetch from './jwt';
import { createSlice } from '@reduxjs/toolkit'


const getTracks = () => async dispatch => {
        const res = await jwtFetch('api/tracks');
        const tracks = await res.json()
        dispatch(receiveTracks(tracks))
}

const getTrack = (trackId) => async dispatch => {
        const res = await jwtFetch(`api/tracks${trackId}`);
        const track = await res.json()
        dispatch(receiveTrack(track))
}


const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        audio: null
    },
    reducers: {
        receiveTracks: (state, action) => {
            state.audio = action.tracks
        },
        receiveTrack: (state, action) => {
            state.audio = action.track
        },
        clearTracks: (state, action) => {
            state.audio = null
        }
    }
})

export const {receiveTracks, receiveTrack, clearTracks} = audioSlice.actions

export default audioSlice.reducer