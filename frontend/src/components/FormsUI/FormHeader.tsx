import React from 'react';
import './FormsUI.css';

export const FormHeader: React.FC<{ text: string }> = ({
  text,
}: {
  text: string;
}): JSX.Element => {
  return <div className="form-header invoice-h3-small">{text}</div>;
};
