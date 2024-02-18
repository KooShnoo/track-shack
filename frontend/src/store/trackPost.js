// @ts-check
import jwtFetch from './jwt';
import { createSelector, createSlice } from '@reduxjs/toolkit'

export const selectPostsArray = createSelector(state => state.trackPosts, tps=> Object.values(tps));


export const getTracks = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/trackPosts');
        if(res.ok) {
            const tracks = await res.json()
            dispatch(receiveTracks(tracks))
        }
    } catch (err) {
        console.log('FROM GET TRACKS THUNK', err)
    }
}

/**
 * @param {File} file 
 * @param {string} url 
 */
export const awsUploadFile = async (url, file) => {
    await fetch(url, {
        method: 'PUT',
        headers: {['Content-Length']: file.size.toString()},
        body: file
    });
}

/**
 * @param {import('../../../backend/src/models/TrackPost').ITrackPostSchema} trackPost 
 * @param {File?} albumpic 
 * @param {File} master 
 * @param {File} stems 
 */
export const postTrack = async (trackPost, albumpic, master, stems) => { 
    const res = await (async () => {
        try {
            return await jwtFetch('/api/trackPosts/', {method: 'POST', body: JSON.stringify(trackPost)});
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

/**
 * @param {Partial<import('../../../backend/src/models/TrackPost').ITrackPostSchema & { _id: string }>} trackPost 
 * @param {File?} albumpic 
 * @param {File?} master 
 * @param {File?} stems 
 */
export const updateTrack = async (trackPost, albumpic, master, stems) => { 
    const res = await (async () => {
        try {
            return await jwtFetch(`/api/trackPosts/${trackPost._id}`, {method: 'PUT', body: JSON.stringify(trackPost)});
        } catch {
            return null;
        }})();
    if (!res) return null;
    /** @type {import('../../../backend/src/models/TrackPost').TpResponseForUpload | {error: string}} */
    const soba = await res.json()
    if ('error' in soba) return null;
    await Promise.all([
        master && awsUploadFile(soba.audioMasterUploadURL, master),
        stems && awsUploadFile(soba.audioStemsUploadURL, stems),
        soba.albumArtUploadURL && albumpic && awsUploadFile(soba.albumArtUploadURL, albumpic),
    ]);
    return soba.id
}

export const getTrack = (trackId) => async dispatch => {
    const res = await jwtFetch(`/api/trackPosts/${trackId}`);
    const track = await res.json()
        dispatch(receiveTrack(track))
}

export const getUserTracks = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/trackPosts/userProfile/${userId}`)
    const tracks = await res.json()
    dispatch(receiveTracksUserProfile(tracks))
}

export const deleteTrack = trackId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/trackPosts/${trackId}`, {method: 'DELETE'})
        if(!res.ok) {
            throw res;
        } else {
            dispatch(removeTrack(trackId))
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

// export const createTrack = (trackPost) => async dispatch => {
//     try {
//         await jwtFetch(`/api/trackPosts`, {
//         method: "POST",
//         body: trackPost
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }


export const trackErrorsSlice = createSlice({
    name: 'trackErrors',
    initialState: {errors: null},
    reducers: {
        recieveErrors: (state, action) => {
            state.errors = action.payload.errors
        },
        clearErrors: (state) => {
            state.errors = null 
        }
    }
})


const trackPostsSlice = createSlice({
    name: 'trackPosts',
    initialState: {},
    reducers: {
        receiveTracks: (state, action) => {
            return {...state, ...action.payload}
        },
        receiveTrack: (state, action) => {
            return {[action.payload._id]: action.payload}
        },
        receiveTracksUserProfile: (state, action) => {
            let data = []
            for(let key in action.payload) {
                data.push(action.payload[key])
            }
            return data
        },
        clearTracks: () => {
            return {}
        },
        removeTrack: (state, action) => {
            delete state[action.payload]
        },
        receiveComment: (state, action) => {
            state[action.payload[1]].comments.push(action.payload[0])
        },
        receiveAudioReply: (state, action) => {
            state[action.payload[1]].responses.push(action.payload[0])
        },
        removeComment: (state, action) => {      
            let [trackId, commentId] = action.payload 
            state[trackId].comments = state[trackId].comments.filter(comment => comment._id !== commentId)
        },
        removeAudioReply: (state, action) => {
            const {replyID, trackId} = action.payload
            state[trackId].responses = state[trackId].responses.filter(reply => reply._id !== replyID);
        }
    }
})

export const {receiveTracks, receiveTrack, clearTracks, receiveComment, removeComment, receiveAudioReply, removeAudioReply, removeTrack, receiveTracksUserProfile} = trackPostsSlice.actions

export const trackErrorsReducer = trackErrorsSlice.reducer

export default trackPostsSlice.reducer