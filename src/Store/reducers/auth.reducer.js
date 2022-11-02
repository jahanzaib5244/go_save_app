import { LOGOUT, USERDATA } from '../states'

const initialState = {
  userData: {},
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case USERDATA: {
      return {
        ...state,
        userData: action.payload,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        userData: {},
      }
    }
    default:
      return state
  }
}
