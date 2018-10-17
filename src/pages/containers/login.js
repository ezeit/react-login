import React from "react";
import { connect } from 'react-redux';
import  * as actions from '../../actions/login';
import { bindActionCreators } from 'redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class LoginContainer extends React.Component{

    handleSubmit = event => {
        event.preventDefault();
        
        this.props.actions.loginSubmit("Acá va a el google id");
    }

    handleSuccessGoogle = response => {
        this.props.actions.googleLoginAsync(response);
    }

    handleFailureGoogle = response => {
        console.log(response);
    }

    handleResponseFacebook = response => {
        console.log(response);
    }

    render(){
        return(
            // <form onSubmit={this.handleSubmit}>
                
                

            //     <FacebookLogin
            //         appId="1149296851775330"
            //         autoLoad={true}
            //         fields="name,email,picture"
            //         callback={this.handleResponseFacebook}
            //         cssClass="my-facebook-button-class"
            //         icon="fa-facebook"
            //     />

            //     <input type="submit" value="Submit" />
            // </form>

            <GoogleLogin
                clientId="998480146256-76is3kvsmu2u0ajm12evoc4rnb5bf11s.apps.googleusercontent.com"
                onSuccess={this.handleSuccessGoogle}
                onFailure={this.handleFailureGoogle}
                buttonText="Ingresá con Google"
            />
        
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
  
export default connect(null, mapDispatchToProps)(LoginContainer);