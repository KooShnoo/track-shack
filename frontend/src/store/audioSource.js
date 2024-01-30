import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import jwtFetch from "./jwt";



export const setAudioSource = (trackId) => {
    //fill out once fetch structure is settled. shoudl be able to pull from other state slice instead of do fetch request?
}

export const removeAudioSource = async dispatch => {
    dispatch(clearAudioSource())
}

//example from docs
// const fetchUserById = createAsyncThunk(
//   'users/fetchByIdStatus',
//   async (userId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId)
//     return response.data
//   }
// )




const audioSourceSlice = createSlice({
    name: 'audioSource',
    initialState: {'audioUrl' : null },
    reducers : {
        receiveAudioSource: (state, action) => {
            state.audioUrl = action.audioUrl
        },
        clearAudioSource: (state, action) => {
            state.audioUrl = null 
        }
    }
})

export const {receiveAudioSource, clearAudioSource} = audioSourceSlice.actions

export default audioSourceSlice.reducer