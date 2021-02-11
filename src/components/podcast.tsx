import React from 'react';
import { Link } from 'react-router-dom';

interface IPodcastProps {
    id: string;
    title: string;
    createdAt: string;
    creator: string;
}

export const Podcast: React.FC<IPodcastProps> = ({
    id,
    title,
    createdAt,
    creator
}) => (
    <Link to={`/podcasts/${id}`}>
            <div className="flex flex-col items-center justify-center bg-indigo-800 w-56 h-56 p-2 mx-2 text-white rounded-full">
                <span className=" text-base">{title}</span>
                <div className="flex flex-col items-center mt-10">
                    <span className="text-xs">{createdAt.split("T")[0]}</span>
                    <span className="text-xs">Created by {creator}</span>
                </div>
            </div>
    </Link>
)