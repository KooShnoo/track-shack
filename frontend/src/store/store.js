
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './session'
import errorsReducer from './errors'
import trackPostsReducer from './trackPost'
import audioSourceReducer from './audioSource'
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import userProfileReducer from './userProfile.js'

const middlewareArray = [thunk, logger];


// window.dispatch = dispatch
// window.createComment = createComment;

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    trackPosts: trackPostsReducer,
    audioSource: audioSourceReducer,
    userProfile: userProfileReducer
})

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareArray),
});



