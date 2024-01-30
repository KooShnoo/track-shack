import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { trackErrorsReducer} from './trackPost';


const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  tracks: trackErrorsReducer
});

export default errorsReducer
