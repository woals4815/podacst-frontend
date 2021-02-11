import { gql, useQuery } from '@apollo/client';
import React from 'react';
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
                updatedAt
            }
        }
    }
`;

export const Podcasts = () => {
    const {data, loading, error} = useQuery<allPodcastsQuery>(ALL_PODCASTS_QUERY);
    if (!data || loading || error) {
        return (
            <div className=" h-screen flex flex-col">
                <span className="font-medium text-xl">Loading...</span>
            </div>
        )
    }
    return (
        <div>
            {!loading && (
                <div className="flex flex-col items-center justify-center">
                    {data.getAllPodcasts.podcasts?.map(podcast => (
                        <Podcast 
                            id={podcast.id + ""}
                            title={podcast.title}
                            updatedAt = {podcast.updatedAt}
                            creator = {podcast.creator.name}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}