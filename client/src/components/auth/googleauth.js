import React from 'react';
import { GoogleLogin } from 'react-google-login';
import api from '../api/api';

const GoogleAuth = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Aqui você pode enviar o token do Google para o seu servidor para autenticar o usuário
    const token = response.tokenId;
    console.log('Google token:', token);
    api.post('/login/google', { token })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
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