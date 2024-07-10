import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/api';
import logo from '../../assets/softinsa.svg';
import Swal from 'sweetalert2';
import './login.css';

function NovaPasseForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);

    // Estados para controle dos requisitos de senha
    const [minLengthValid, setMinLengthValid] = useState(false);
    const [hasNumberValid, setHasNumberValid] = useState(false);
    const [hasUppercaseValid, setHasUppercaseValid] = useState(false);
    const [hasSpecialCharValid, setHasSpecialCharValid] = useState(false);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const navigate = useNavigate();

    const handleResetPasse = async () => {
        if (password !== confirmPassword) {
            setError(true);
            return;
        }

        setError(false);

        try {
            const response = await api.post('/reset-passe', { novaPass: password, token });
            Swal.fire({
                title: 'Sucesso!',
                text: response.data.message,
                icon: 'success',
                confirmButtonColor: '#1D324F',
                willClose: () => {
                    navigate('/login');
                    const verificationToken = localStorage.getItem('verificationToken') || sessionStorage.getItem('verificationToken');
                    if (verificationToken) {
                        localStorage.removeItem('verificationToken');
                        sessionStorage.removeItem('verificationToken');
                    }
                },
            });
        } catch (error) {
            setError(true);
            if (error.response) {
                Swal.fire({
                    title: 'Erro!',
                    text: error.response.data.error,
                    icon: 'error',
                    confirmButtonColor: '#1D324F',
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleResetPasse();
    };

    const validatePassword = (value) => {
        // Verificar se a palavra-passe tem pelo menos 6 caracteres
        if (value.length >= 6) {
            setMinLengthValid(true);
        } else {
            setMinLengthValid(false);
        }

        // Verificar se a palavra-passe contém pelo menos um número
        if (/\d/.test(value)) {
            setHasNumberValid(true);
        } else {
            setHasNumberValid(false);
        }

        // Verificar se a palavra-passe contém pelo menos uma letra maiúscula
        if (/[A-Z]/.test(value)) {
            setHasUppercaseValid(true);
        } else {
            setHasUppercaseValid(false);
        }

        // Verificar se a palavra-passe contém pelo menos um caractere especial
        if (/[!@#$%^&*]/.test(value)) {
            setHasSpecialCharValid(true);
        } else {
            setHasSpecialCharValid(false);
        }
    };

    return (
        <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{ height: '67vh' }}>
            <header className="header mb-1">
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <form onSubmit={handleSubmit} className="login-form">
                <div className={`form-group ${error ? 'has-error' : ''}`}>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        placeholder="Nova Palavra-Passe"
                        style={{ backgroundColor: '#DCDCDC' }}
                    />
                </div>
                <div className={`form-group ${error ? 'has-error' : ''}`}>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmar Nova Palavra-Passe"
                        style={{ backgroundColor: '#DCDCDC' }}
                    />
                </div>
                {/* Exibição dos requisitos da palavra-passe */}
                <div className="password-requirements">
                    <ul>
                        <li className={minLengthValid ? 'text-success' : ''}>Pelo menos 6 caracteres</li>
                        <li className={hasNumberValid ? 'text-success' : ''}>Pelo menos um número</li>
                        <li className={hasUppercaseValid ? 'text-success' : ''}>Pelo menos uma letra maiúscula</li>
                        <li className={hasSpecialCharValid ? 'text-success' : ''}>Pelo menos um caracter especial (!@#$%^&*)</li>
                    </ul>
                </div>
                {error && (
                    <div className="password-error-message">
                        As palavras-passe não coincidem.
                    </div>
                )}
                <button className="btn btn-outline-success mt-2" id='botaoEntrar'>
                    ALTERAR PALAVRA-PASSE
                </button>
            </form>
        </div>
    );
}

export default NovaPasseForm;
