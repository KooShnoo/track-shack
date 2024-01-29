import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';


const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
});

export default errorsReducer
