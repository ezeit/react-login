import { 
  LOGIN_SUBMIT,
  LOGIN_GOOGLE_SUBMIT
} from '../action-types/index';

const initialState = {
    user: "",
    password: "",
    googleId: 0,
    facebookId: 0,
}

function login(state = initialState, action) {
  switch(action.type) {
    case LOGIN_SUBMIT:
      return {
        ...state,
        googleId: action.payload.googleId
      }
    
    case LOGIN_GOOGLE_SUBMIT:
      return {
        ...state,
        googleToken: action.payload.googleToken 
      }
    
      default:
      return state
  }
}

export default login;
