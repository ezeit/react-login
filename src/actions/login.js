import {
  IS_LOADING,
  LOGIN_GOOGLE_SUBMIT,
  LOGIN_SUBMIT,
  USER_LOGIN
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

export function userLogin(dataUser){
  return{
    type: USER_LOGIN,
    payload:{
      dataUser
    }
  }
}

export function getUserInfo(xToken){
  const url = "http://localhost:17927/Usuario/Me";

  fetch(url, {
    method: 'POST', // or 'PUT'
    headers:{
      'Content-Type': 'application/json',
      'X-Token': xToken
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    dispatch(isLoading(false))
    
    console.log(response);
  });
}


export function googleLoginAsync(googleResponse) {
  return (dispatch) => {
    
    dispatch(isLoading(true))
    
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

    // Call a gestionar red social
    var result = fetch("http://localhost:17927/Usuario/GestionarRedSocial", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    // Trato el response de gestionar red social y obtengo tokens
    .then(response => {
      // parse response
      const splitedResponse = response.response.split("|");
      const code = splitedResponse[0];
      const xToken = (code == "0000") ? splitedResponse[1] : null;
      const xValue = (code == "0000") ? splitedResponse[2] : null;

      // Hago el call a usuario ME
      return fetch("http://localhost:17927/Usuario/Me", {
        method: 'POST', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
          'X-Token': xToken
        }
      })
    })
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.log('Request failed', error)
    })
  
    // I'm using the result variable to show that you can continue to extend the chain from the returned promise
    result.then(function(r) {
      const dataJson = JSON.parse(r.response);

      dispatch(userLogin(dataJson));
      
      console.log(dataJson); // 2nd request result
    });

    
    dispatch(isLoading(true))
  }

}


  
  