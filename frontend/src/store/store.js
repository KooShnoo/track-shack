
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './session'
import errorsReducer from './errors'
import trackPostsReducer from './trackPost'
import audioSourceReducer from './audioSource'
import thunk from 'redux-thunk';
// import session from "./session";
// import errors from "./errors";
// import tweets from "./tweets";


const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    trackPosts: trackPostsReducer,
    audioSource: audioSourceReducer
})

export default configureStore({
  reducer: rootReducer,
   middleware: (getDefaultMiddleware) => [thunk],
});



