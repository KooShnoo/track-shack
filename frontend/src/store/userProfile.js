// import jwtFetch from "./jwt";
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