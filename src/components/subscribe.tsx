import { gql, useMutation, useQuery } from '@apollo/client';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getSubscriptions } from '../__generated__/getSubscriptions';
import { subscribe, subscribeVariables } from '../__generated__/subscribe';
import { FormError } from './form-error';

export const SUBSCRIBE = gql`
    mutation subscribe($input: Float!){
        toggleSubscribe(podcastId: $input){
            ok
            error
        }
    }
`;
export const SUBSCRIPTIONS = gql`
    query getSubscriptions{
        getSubscriptions{
            ok
            error
            subscriptions{
                id
                title
            }
        }
    }
` 
interface ISubscribeProps {
    podcastId: number;
}

export const SubscribeBtn: React.FC<ISubscribeProps> = ({podcastId}) => {
    const {data, error, loading: subscriptionLoading, refetch} = useQuery<getSubscriptions>(SUBSCRIPTIONS);
    const isSub = data?.getSubscriptions.subscriptions?.some(podcast => podcast.id === podcastId);
    const [subState, setSubState] = useState(isSub);
    const onCompleted = async (data: subscribe) => {
        const {
            toggleSubscribe: {
                ok
            }
        } = data;
        if (ok) {
            await refetch();
            setSubState(isSub);
        } 
    }
    const [subscribe, {data: subscribeResult, loading, error: err}] = useMutation<subscribe, subscribeVariables>(SUBSCRIBE, {
        onCompleted
    });
    const onClicked = async () => {
        if (!loading){
            await subscribe({
            variables: {
                input: podcastId
            }
        });}
    }
    return (
        <div>
            <div className="flex items-center">
                <span>Subscription   </span>
                <button onClick={onClicked} className={`${loading? " pointer-events-none hidden ": ""}focus:outline-none ml-2`}>
                    <FontAwesomeIcon icon={faPlus} className={`${isSub ? "hidden": ""}`}  />
                    <FontAwesomeIcon icon={faCheck}  className={`${!isSub ? "hidden": ""}`}/>
                </button>
                <div className={`${loading ? " border-red-600 animate-spin border-t-2 border-b-2 h-3 w-3 rounded-full ml-2": "hidden"}`}></div>
                {subscribeResult?.toggleSubscribe.error && (
                    <FormError errormessage={subscribeResult.toggleSubscribe.error} />
                )}
            </div>
        </div>
    )
}