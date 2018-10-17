import { 
  LOGIN_SUBMIT,
  LOGIN_GOOGLE_SUBMIT,
  USER_LOGIN
} from '../action-types/index';

const initialState = {
    user: null
}

function login(state = initialState, action) {
  switch(action.type) {
    case USER_LOGIN:

      localStorage.setItem('X-Token', JSON.stringify(action.payload.dataUser.Usuario.UsuarioDetalleGuid));

      return {
        ...state,
        user: action.payload.dataUser.Usuario
      }
    
    default:
      return state
  }
}

export default login;
