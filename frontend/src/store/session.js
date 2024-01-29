import jwtFetch from './jwt';
import { createSlice } from '@reduxjs/toolkit'

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async dispatch => {
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });
    const { user, token } = await res.json();
    localStorage.setItem('jwtToken', token);
    return dispatch(receiveCurrentUser(user));
  } catch(err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch(logoutUser());
};

export const getCurrentUser = () => async dispatch => {
  const res = await jwtFetch('/api/users/current');
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};



const sessionErrorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errors: null
  },
  reducers: {
    receiveSessionErrors : (state, action) => {
      state.errors = action.errors
    },
    clearSessionErrors : (state, action) => {
      state.errors = null
    }
  },
})


export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null
  },
  reducers: {
    receiveCurrentUser: (state, action) => {
     state.user = action.user 
    },
    receiveUserLogout: (state, action) => {
      state.currentUser.user = null
    },
  }
})

// Action creators are generated for each case reducer function
export const { receiveCurrentUser, receiveUserLogout} = sessionSlice.actions
export const { receiveSessionErrors, clearSessionErrors} = sessionErrorsSlice.actions
export const errorsReducer = sessionErrorsSlice.reducer


export default sessionSlice.reducer