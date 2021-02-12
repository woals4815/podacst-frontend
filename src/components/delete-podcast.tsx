import { gql, useMutation } from '@apollo/client';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteMutation, deleteMutationVariables } from '../__generated__/deleteMutation';

export const DELETE_PODCAST = gql`
    mutation deleteMutation($input: DeletePodcastInput!) {
        deletePodcast(input: $input) {
            ok
            error
        }
    }
`

interface IDeleteProps {
    podcastId: number;
}

export const DeletePodcastBtn: React.FC<IDeleteProps> = ({podcastId}) => {
    const history = useHistory();
    const onCompleted = (data: deleteMutation) => {
        const {
            deletePodcast: {
                ok
            }
        } = data;
        if (ok) {
            alert('Successfully delete the podcast 👊');
            history.push('/');
        }
    }
    const [deletePodcast, {data, loading, error}] = useMutation<deleteMutation, deleteMutationVariables>(DELETE_PODCAST, {
        onCompleted,
    })
    const onClicked = async() => {
        if (!loading) {
            await deletePodcast({
                variables: {
                    input: {
                        podcastId
                    }
                }
            })
        }
    }
    return (
        <div>
            <button onClick={onClicked} className="focus:outline-none">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}