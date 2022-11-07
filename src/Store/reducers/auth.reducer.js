import { ALL_REQUEST, ALL_USERS, LOGOUT, USERDATA } from '../states'

const initialState = {
  userData: {},
  all_users: [],
  all_requests: [],
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case USERDATA: {
      return {
        ...state,
        userData: action.payload,
      }
    }
    case ALL_USERS: {
      return {
        ...state,
        all_users: action.payload,
      }
    }
    case ALL_REQUEST: {
      return {
        ...state,
        all_requests: action.payload,
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
