import {
  IS_LOADING,
  LOGIN_GOOGLE_SUBMIT,
  LOGIN_SUBMIT
} from "../action-types/index";

var jwtDecode = require('jwt-decode');

/*
  TYPE : Tiene que ser la acción que va a ejecutar el reducer. 
  PAYLOAD : Data que se le tiene que envíar al reducer para actualziar los datos de la store

  Al reducer le va a llegar como "action" el return de la función. 
  action.type va a ser lo que decida que hacer. 
  action.payload es el obj data que se va a necesitar para actualizar la store
*/

/*
  Cada una de estas acciones llegan como un dispatch al reducer.
  En las acciones se tienen que hacer los llamados a las APIs y armar el modelo de datos. 
  Este modelo de datos se los pasa al Reducer desde el payload para que se actualice la data en el store. 

  Cuando el reducer actualiza el modelo de datos, cada componente correspondiente tiene que chequear el estado de este store para ver que es lo que tiene que renderear o hacer.
*/

export function isLoading(value) {
  return {
    type: IS_LOADING,
    payload: {
      value
    }
  }
}

export function loginSubmit(googleId) {
  return {
    type: LOGIN_SUBMIT,
    payload: {
      googleId
    }
  }
}

export function googleLogin(googleResponse){
  return{
    type: LOGIN_GOOGLE_SUBMIT,
    payload:{
      googleToken: googleResponse.accessToken
    }
  }
}


export function googleLoginAsync(googleResponse) {
  return (dispatch) => {
    
    const decoded = jwtDecode(googleResponse.tokenId);
    const data = {
      AccessToken: googleResponse.tokenId,
      UsuarioDetalleNombre: decoded.given_name,
      UsuarioDetalleApellido: decoded.family_name,
      SitioId: 1, 
      UsuarioGmailId: decoded.sub,
      GFamilyName: decoded.family_name,
      GGivenName: decoded.given_name,
      GMail: decoded.email
    }

    // const url = "http://localhost:17927/Usuario/GestionarRedSocial";

    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(data), // data can be `string` or {object}!
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    // .catch(error => console.error('Error:', error))
    // .then(response => {
    //   dispatch(isLoading(false))
    //   console.log('Success:', response)
    // });

    dispatch(isLoading(true))

    // setTimeout(()=> {

    //   dispatch(isLoading(false))
    //   dispatch(googleLogin(googleResponse))

    // }, 5000)
  }

}


  
  