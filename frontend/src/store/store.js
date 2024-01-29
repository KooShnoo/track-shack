// @ts-check

import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './session'
import errorsReducer from './errors'
import trackPostsReducer from './trackPost'
// import thunk from 'redux-thunk';
// import session from "./session";
// import errors from "./errors";
// import tweets from "./tweets";


export default configureStore({
  reducer: {
    session: sessionReducer,
    errors: errorsReducer,
    trackPosts: trackPostsReducer
  }
})

