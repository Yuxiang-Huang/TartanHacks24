import React, { useEffect, useState } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const showHideClassName = isOpen ? "" : " hidden ";

    return (
        <div className={showHideClassName}>
            <button onClick={onClose}>
                Close
            </button>
            <div>
                <label>Email:</label>
                <input type="email" required />
                <label>Password:</label>
                <input type="password" required />
                <button onClick={onClose}>Login</button>
            </div>
        </div>
    );
};

export default LoginModal;
