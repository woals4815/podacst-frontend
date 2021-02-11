import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Header } from '../components/header';
import { Podcast } from '../components/podcast';
import { allPodcastsQuery } from '../__generated__/allPodcastsQuery';

export const ALL_PODCASTS_QUERY = gql`
    query allPodcastsQuery{
        getAllPodcasts{
            ok
            error
            podcasts{
                id
                title
                creator{
                    id
                    name
                    email
                }
                createdAt
            }
        }
    }
`;

export const Podcasts = () => {
    const {data, loading, error} = useQuery<allPodcastsQuery>(ALL_PODCASTS_QUERY);
    if (loading || error || !data) {
        console.log(data, loading, error);
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    console.log(data, loading, error);
    return (
        <div>
            <Header />
            {!loading && (
                <div className="h-screen flex items-center justify-center bg-gray-300">
                    <div className="flex items-center overflow-x-scroll justify-center">
                        {data?.getAllPodcasts.podcasts?.map(podcast => (
                                <Podcast
                                    key={podcast.id} 
                                    id={podcast.id + ""}
                                    title={podcast.title}
                                    createdAt = {podcast.createdAt}
                                    creator = {podcast.creator.name}
                                />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}