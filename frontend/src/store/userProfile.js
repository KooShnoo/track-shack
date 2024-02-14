// @ts-check
import jwtFetch from "./jwt";
import { awsUploadFile } from "./trackPost";
// import { createSlice } from "@reduxjs/toolkit";



// export const getUser = (userId) => async dispatch => {
//     try {
//         const user = await jwtFetch(`/api/users/${userId}`)
//         if(user.ok) {
//             let data = await user.json()
//             dispatch(receiveUser(data))
//         }
//     } catch (err) {
//         console.log('USER PROFILE ERROR', err)
//     }
// }

/** @param {File} pfp_file */
export const uploadPfp = async pfp_file => {
  const res = await jwtFetch('/api/users/pfp', {method: 'PUT', body: JSON.stringify({pfp_filename: pfp_file.name})});
  /** @type {import('../../../backend/src/routes/api/users').pfpResponseForUpload} */
  const { pfpUploadURL } = await res.json();
  await awsUploadFile(pfpUploadURL, pfp_file);
}

// const userProfileSlice = createSlice({
//     name: 'userProfile',
//     initialState: {},
//     reducers: {
//         receiveUser: (state, action) => {
//             return {...state, ...action.payload}
//         },
//         clearUser: () => {
//             return {}
//         }
//     }
// })

// export const {receiveUser, clearUser} = userProfileSlice.actions

// export default userProfileSlice.reducer 