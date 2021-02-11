import React from 'react';
import { Link } from 'react-router-dom';

interface IPodcastProps {
    id: string;
    title: string;
    updatedAt: string;
    creator: string;
}

export const Podcast: React.FC<IPodcastProps> = ({
    id,
    title,
    updatedAt,
    creator
}) => (
    <Link to={`/podcasts/${id}`}>
        <div>
            <span>{title}</span>
            <span>{updatedAt}</span>
            <span>{creator}</span>
        </div>
    </Link>
)