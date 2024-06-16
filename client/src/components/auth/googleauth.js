import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import api from '../api/api';
import Swal from 'sweetalert2';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const rememberUser = localStorage.getItem('rememberUser') === 'true';

  const handleSuccess = async (response) => {
  const token = response.credential;
  try {
    const res = await api.post('/login/google', { token });
    if (rememberUser) {
      localStorage.setItem('token', res.data.token);
    } else {
      sessionStorage.setItem('token', res.data.token);
    }
    window.dispatchEvent(new Event('storage'));

    setErrorMessage(null);

    Swal.fire({
      title: 'Sucesso!',
      text: 'Login com a conta Google realizado com sucesso',
      icon: 'success',
      confirmButtonColor: '#1D324F',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userResponse = await api.get('/utilizador');
        if (userResponse && userResponse.data) {
          const { idPosto } = userResponse.data;
          if (idPosto === null || idPosto === undefined) {
            navigate('/posto');
          } else {
            navigate('/');
          }
        } else {
          console.error('Invalid user response:', userResponse);
        }
      }
    });
  } catch (err) {
    console.error('Server error:', err);
    setErrorMessage('Server error. Please try again later.');
  }
};

  const handleError = () => {
    console.error('Google login failed');
    setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="104348306910-f5tbgkc3udd9jphc4i44vgdsv7jing48.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
