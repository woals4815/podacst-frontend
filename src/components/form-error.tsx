import React from 'react';

interface IFormErrorsProps {
    errormessage: string;
}

export const FormError: React.FC<IFormErrorsProps> = ({errormessage}) => (
    <span role="alert" className=" font-normal text-red-500">{errormessage}</span>
);