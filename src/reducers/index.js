import {combineReducers} from 'redux';

import HuesReducer from './hues';

const rootReducer  = combineReducers({
	hues: HuesReducer
});

export default rootReducer ;