import { combineReducers } from 'redux'

import AuthReducer from '../Store/reducers/auth.reducer'

const rootReducer = combineReducers({ AuthReducer })

export default rootReducer
