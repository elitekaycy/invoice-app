import React from 'react';
import './Spinner.css'

const Spinner: React.FC = (): JSX.Element => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
