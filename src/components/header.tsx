import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { UserRole } from '../__generated__/globalTypes';

export const Header = () => {
    const {data, loading, error} = useMe();
    return (
        <div className=" fixed right-16 top-2">
            {!loading && 
                <div className="flex px-4 bg-gray-300">
                    <Link to={`users/${data?.me.id}`}>
                        <FontAwesomeIcon icon={faUser} className="text-2xl" />
                    </Link>
                    {data?.me.role === UserRole.Host && (
                        <Link to="/add-podcast">
                        <span className="font-medium">Add Podcast</span>
                    </Link>
                    )}
                </div>
            }
        </div>
    )
}