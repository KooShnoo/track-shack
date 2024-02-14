// @ts-check
import jwtFetch from "./jwt";
import { awsUploadFile } from "./trackPost";
import { createSlice } from "@reduxjs/toolkit";



export const updateUser = (user, userId) => async dispatch => {
    try {
        const response = await jwtFetch(`/api/users/${userId}`, {
          method: 'POST',
          body: user
        })
        if(response.ok) {
            let data = await response.json()
            // dispatch(receiveCurrentUserUpdate(user))
        }
    } catch (err) {
        console.log('USER PROFILE ERROR', err)
    }
}

export const getUser = (userId) => async dispatch => {

  const result = await jwtFetch(`/api/users/${userId}`)
  if(result.ok) {
    debugger
    const user = await result.json();
    debugger
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
          debugger
            return {...action.payload}
        },
        clearUser: () => {
            return {}
        },
        recieveUpdate: (state, action) => {
          return {}
        }
    }
})

export const {receiveUser, clearUser, recieveUpdate} = userProfileSlice.actions

export default userProfileSlice.reducer 