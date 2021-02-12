import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { podcastQuery, podcastQueryVariables } from '../__generated__/podcastQuery';
import {AddEpisode} from '../components/add-episode';
import { useMe } from '../hooks/useMe';
import { UserRole } from '../__generated__/globalTypes';
import { SubscribeBtn } from '../components/subscribe';

export const PODCAST_QUERY = gql`
    query podcastQuery($input: Float!){
        getPodcast(podcastId: $input){
            ok
            error
            podcast{
                id
                title
                createdAt
                category{
                    id
                    name
                }
                creator{
                    id
                    name
                }
                episodes{
                    id
                    title
                    description
                    createdAt
                }
            }
        }
    }
`;
interface IPodcastParams{
    id: string;
}

export const Podcast = () => {
    const params = useParams<IPodcastParams>();
    const {data: myData}= useMe();
    const {data, loading, error} = useQuery<podcastQuery, podcastQueryVariables>(PODCAST_QUERY, 
        {
            variables: {
                input: +params.id
            }
        }
    );
    console.log(error);
    if (!data || error || loading) {
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    return (
        <div className="h-screen bg-gray-300 flex justify-center items-center">
            {data.getPodcast.podcast?.episodes.length === 0 ? (
                <div className=" flex flex-col items-center">
                    <SubscribeBtn podcastId={+params.id} />
                    <span className="text-xl">There is no episode!</span>
                    {myData?.me.name === data.getPodcast.podcast.creator.name && 
                    (
                        <AddEpisode id={params.id + ""}/>
                    )}
                </div>
            ) : (
                    <div className="flex flex-col items-center">
                        <SubscribeBtn podcastId={+params.id} />
                        {data.getPodcast.podcast?.episodes.map(episdoe => (
                        <span>{episdoe.title}</span>
                        ))}
                        {myData?.me.name === data.getPodcast.podcast?.creator.name && 
                        (
                            <AddEpisode id={params.id + ""}/>
                        )}
                    </div>
            )}
        </div>
    )
}