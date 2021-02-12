import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IEpisodeParams {
    id: string;
}

export const AddEpisode: React.FC<IEpisodeParams> = ({id}) => (
    <div className="h-10 w-4/12 border-2 flex justify-center items-center rounded-full bg-gray-800 text-indigo-50 fixed bottom-28">
        <Link to={`/podcasts/${id}/add-episode`}>
            <FontAwesomeIcon icon={faPlus} />
        </Link>
    </div>
)