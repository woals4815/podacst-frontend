import React from 'react';

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = 
({loading, canClick, actionText}) => (

        <button
        className={`text-lg font-medium focus:outline-none text-white transition-colors h-10 rounded-3xl ${
            canClick? " bg-red-300 hover:bg-red-400" : "bg-gray-300 pointer-events-none"
        }`}
    >
        {loading? "Loading.." : actionText}
    </button>
);