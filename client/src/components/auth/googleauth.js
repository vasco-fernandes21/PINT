import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Aqui você pode enviar o token do Google para o seu servidor para autenticar o usuário
  }

  return (
    <GoogleLogin
      clientId="946771932227-a38o98q56j3dqaubcqk9pho47u76u89n.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
}

export default GoogleAuth;