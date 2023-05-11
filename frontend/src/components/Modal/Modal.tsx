import React, { useState, useContext } from "react";
import "./Modal.css";
import { ThemeContextDefault } from "../../context/ThemeContext";

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
    const theme = useContext(ThemeContextDefault)

    const closeModal = () => {
        onClose();
    };

    return isOpen ? (
        <div className="modal">
            <div className={`modal-content ${theme?.theme === 'light' ? 'modal-light' : 'modal-dark'}`}>
                <div className="modal-header">
                    <h2>{title || ''}</h2>
                    <button className="close-button" onClick={closeModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    ) : null;
};

