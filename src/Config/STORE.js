import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './RootReducer'

const STORE = createStore(rootReducer, applyMiddleware(thunk))

export default STORE
