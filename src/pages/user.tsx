import React from 'react';
import { useMe } from '../hooks/useMe';



export const User = () => {
    const {data, loading, error} = useMe();
    if (loading || error || !data) {
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div>
                <div>Your Email: {data.me.email}</div>
                <div>NickName: {data.me.name}</div>
                <div>Role: {data.me.role}</div>
            </div>
        </div>
    )
}