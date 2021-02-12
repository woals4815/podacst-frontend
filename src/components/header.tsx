import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { UserRole } from '../__generated__/globalTypes';
import { AddPodcast } from './add-podcast';

export const Header = () => {
    const {data, loading, error} = useMe();
    if (loading || error || !data) {
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    return (
        <div className=" left-1 top-3 absolute z-50">
            {!loading && 
                <div className="flex px-4 items-center">
                    <Link to={`users/${data?.me.id + ""}`}>
                        <div className="rounded-full bg-gray-800 h-10 w-10 flex items-center justify-center  mx-3">
                            <FontAwesomeIcon icon={faUser} className="text-xl text-indigo-50" />
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="h-10 w-10 flex rounded-full items-center justify-center mx-3 bg-gray-800">
                            <FontAwesomeIcon icon={faHome} className="text-xl text-indigo-50" />
                        </div>
                    </Link>
                    {data?.me.role === UserRole.Host && (
                    <Link to="/add-podcast">
                        <AddPodcast />
                    </Link>
                    )}
                </div>
            }
        </div>
    )
}