import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/button';
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

interface IFormProps {
    searchTerm: string;
}

export const Podcasts = () => {
    const {data, loading, error} = useQuery<allPodcastsQuery>(ALL_PODCASTS_QUERY);
    const history = useHistory();
    const { register, handleSubmit, getValues, formState} = useForm<IFormProps>();
    const onSearchSubmit = () => {
        const { searchTerm } = getValues();
        history.push({
            pathname: "/search",
            search: `?term=${searchTerm}`,
        });
    };
    if (loading || error || !data) {
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    return (
        <div>
            {!loading && (
                <div className="h-screen flex-wrap flex items-center justify-center bg-gray-300 absolute left-3">
                        <form onSubmit={handleSubmit(onSearchSubmit)} className="flex flex-col items-center">
                        <input
                        ref={register({
                            required: true,
                            min: 3
                        })} 
                        type="text"
                        name="searchTitle"
                        placeholder="Write title you are looking for..."
                        className="input"
                        />
                        <Button 
                            canClick={formState.isValid}
                            actionText={"Search! "}
                            loading={false}
                        />
                        </form>
                    <div className="flex items-center overflow-scroll justify-center overscroll-x-contain bg-gray-300">
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