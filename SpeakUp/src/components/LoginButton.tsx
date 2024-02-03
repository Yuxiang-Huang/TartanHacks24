import React from 'react';

interface LoginButtonProps {
    isLoggedIn: boolean;
    logout: () => void;
    openModal: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoggedIn, logout, openModal }) => {
    return (
        <button onClick={isLoggedIn ? logout : openModal}>{isLoggedIn ? 'Logout' : 'Login'}</button>
    );
};

export default LoginButton;
