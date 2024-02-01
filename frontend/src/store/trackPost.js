
import jwtFetch from './jwt';
import { createSlice } from '@reduxjs/toolkit'

export const selectPostsArray = (state) => Object.values(state.trackPosts);


export const getTracks = () => async dispatch => {
    try {
        const res = await jwtFetch('api/trackPosts');
        if(res.ok) {
            const tracks = await res.json()
            dispatch(receiveTracks(tracks))
        }
    } catch (err) {
        let errors = err.json()
        console.log('FROM GET TRACKS THUNK', errors)
        // dispatch()
    }
}

/**
 * @param {File} file 
 * @param {string} url 
 */
const awsUploadFile = (url, file) => {
    fetch(url, {
        method: 'PUT',
        headers: {['Content-Length']: file.size.toString()},
        body: file
    });
}

/**
 * 
 * @param {import('../../../backend/src/models/TrackPost').ITrackPostSchema} trackPost 
 * @param {File?} albumpic 
 * @param {File} master 
 * @param {File} stems 
 */
export const postTrack = async (trackPost, albumpic, master, stems) => { 
    const res = await (async () => {
        try {
            return await jwtFetch('api/trackPosts/', {method: 'POST', body: JSON.stringify(trackPost)});
        } catch {
            return null;
        }})();
    if (!res) return null;
    /** @type {import('../../../backend/src/models/TrackPost').TpResponseForUpload | {error: string}} */
    const soba = await res.json()
    if ('error' in soba) return null;
    await Promise.all([
        awsUploadFile(soba.audioMasterUploadURL, master),
        awsUploadFile(soba.audioStemsUploadURL, stems),
        soba.albumArtUploadURL && albumpic && awsUploadFile(soba.albumArtUploadURL, albumpic),
    ]);
    return soba.id

}

export const getTrack = (trackId) => async dispatch => {
    const res = await jwtFetch(`/api/trackPosts/${trackId}`);
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
            state.errors = action.payload.errors
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
            // debugger
            return {...state, ...action.payload}
        },
        receiveTrack: (state, action) => {
            // debugger
            return {...state , [action.payload._id]: action.payload}
        },
        clearTracks: (state, action) => {
            return {}
        }
    }
})

export const {receiveTracks, receiveTrack, clearTracks} = trackPostsSlice.actions

export const trackErrorsReducer = trackErrorsSlice.reducer

export default trackPostsSlice.reducer