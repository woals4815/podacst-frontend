import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { createPodcast, createPodcastVariables, createPodcast_createPodcast } from '../__generated__/createPodcast';

export const ADD_PODCAST= gql`
    mutation createPodcast($input: CreatePodcastInput!){
        createPodcast(input: $input){
            ok
            error
            podcastId
        }
    }
`;

interface ICreatePodcastProps {
    title: string;
    category: string;
};

export const AddPodcast = () => {
    const {getValues, errors, handleSubmit, formState, register} = useForm<ICreatePodcastProps>({
        mode: 'onChange'
    });
    const history = useHistory();
    const onCompleted = (data: createPodcast) => {
        const {
            createPodcast: {
                ok, podcastId
            }
        } = data;
        if (ok && podcastId) {
            alert('Successfully created the podcast! Go to detail 👊');
            history.push(`/podcasts/${podcastId}`);
        }
    };
    const [createPodcast, {data: createResult, loading}] = useMutation<createPodcast, createPodcastVariables>(ADD_PODCAST, {
        onCompleted
    })
    const onSubmit = async () => {
        if (!loading) {
            const {title, category} = getValues();
            await createPodcast({
                variables: {
                    input: {
                        title,
                        categoryName: category
                    }
                }
            });
        }
    }
    return (
        <div className="h-screen w-screen bg-gray-300">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-36 px-4">
                    <input 
                    ref={register({
                        required: "Title is required."
                    })} 
                    type="text" 
                    name="title"
                    required
                    placeholder="Title"
                    className="input mb-2"
                    />
                    <input 
                    ref={register({
                        required: "Category Name is required."
                    })}
                    type="text"
                    name="category"
                    required
                    placeholder="Write Category. Please write with space."
                    className="input mb-2"
                    />
                    <Button 
                        loading={loading}
                        canClick={formState.isValid}
                        actionText={"Create a Podcast 👊"}
                    />
                    {
                        createResult?.createPodcast.error && (
                            <FormError errormessage={createResult.createPodcast.error} />
                        )
                    }
                </form>
        </div>
    )
}