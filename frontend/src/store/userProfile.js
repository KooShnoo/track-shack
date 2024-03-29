// @ts-check
import jwtFetch from "./jwt";
import { awsUploadFile } from "./trackPost";
import { createSlice } from "@reduxjs/toolkit";



export const updateUser = (user) => async dispatch => {
    try {
        const response = await jwtFetch(`/api/users`, {
          method: 'PUT',
          body: JSON.stringify(user)
        })
        if(response.ok) {
            let updatedUser = await response.json()
            dispatch(receiveUser(updatedUser))
        }
    } catch (err) {
        let errors = await err.json()
        console.log('USER PROFILE ERROR', errors)
    }
}

export const getUser = (userId) => async dispatch => {
  
  const result = await jwtFetch(`/api/users/${userId}`)
  if(result.ok) {
    const user = await result.json();
    dispatch(receiveUser(user))
  }
}



/** @param {File} pfp_file */
export const uploadPfp = async pfp_file => {
  const res = await jwtFetch('/api/users/pfp', {method: 'PUT', body: JSON.stringify({pfp_filename: pfp_file.name})});
  /** @type {import('../../../backend/src/routes/api/users').pfpResponseForUpload} */
  const { pfpUploadURL } = await res.json();
  await awsUploadFile(pfpUploadURL, pfp_file);
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {},
    reducers: {
        receiveUser: (state, action) => {
            return {...action.payload}
        },
        clearUser: () => {
            return {}
        },
    }
})

export const {receiveUser, clearUser} = userProfileSlice.actions

export default userProfileSlice.reducer 