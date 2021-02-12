import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { createEpisode, createEpisodeVariables } from '../__generated__/createEpisode';

const ADD_EPISODE = gql`
    mutation createEpisode($input: CreateEpisodeInput!){
        createEpisode(input: $input){
            ok
            error
            episodeId
        }
    }
`
interface ICreateEpisodeForm {
    podcastId: number;
    title: string;
    description: string;
}
interface IParams{
    id: string;
}

export const AddEpisode = () => {
    const params = useParams<IParams>();
    const history= useHistory();
    const {getValues, handleSubmit, errors, register, formState} = useForm<ICreateEpisodeForm>({
        mode: 'onChange'
    });
    const onCompleted = (data: createEpisode) => {
        const {
            createEpisode: {
                ok, episodeId
            }
        } = data;
        if (ok && episodeId){
            alert('Successfully created the episode! 👊');
            history.push(`/podcasts/${params.id}`);
            window.location.reload();
        }
    }
    const [createEpisode, {data: createResult, loading}] = useMutation<createEpisode, createEpisodeVariables>(ADD_EPISODE, {
        onCompleted
    })
    const onSubmit = async () => {
        const {title, description} = getValues();
        if (!loading) {
            await createEpisode({
                variables: {
                    input: {
                        title,
                        description,
                        podcastId: +params.id
                    }
                }
            })
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
                required
                placeholder="Write your episode's title"
                name="title"
                className="input mb-3"
                />
                {errors.title?.message && (
                    <FormError errormessage={errors.title.message} />
                )}
                <input
                ref={register({
                    required: "Description is required."
                })}  
                type="text"
                required
                placeholder="Write your episode's description"
                name="description"
                className="input mb-3"
                />
                {errors.title?.message && (
                    <FormError errormessage={errors.title.message} />
                )}
                <Button 
                    loading={loading}
                    canClick={formState.isValid}
                    actionText={"Create a Episode! 👊"}
                />
                {createResult?.createEpisode.error && (
                    <FormError errormessage={createResult.createEpisode.error} />
                )}
            </form>
        </div>
    )
}