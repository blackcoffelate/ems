import React from 'react';

interface ErrorMessageProps {
    text: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
    return <div className="p-8 text-red-400 text-center">{text}</div>;
};