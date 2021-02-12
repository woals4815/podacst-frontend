import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../components/button';
import { searchQuery, searchQueryVariables } from '../__generated__/searchQuery';

const SEARCH_QUERY = gql`
    query searchQuery($input: SearchPodcastInput!){
        searchPodcastName(input: $input){
            ok
            error
            searchResults{
                id
                title
                createdAt
            }
            totalResultNumber
        }
    }
`

export const Search = () => {
    const location = useLocation();
    const history = useHistory();
    const [searchPodcastName, {loading, data, called}] = useLazyQuery<searchQuery, searchQueryVariables>(SEARCH_QUERY);
    useEffect(() => {
        const [_, query] = location.search.split('?term=');
        if (!query) {
            return history.replace('/');
        }
        searchPodcastName({
            variables: {
                input: { query }
            }
        })
    }, [history, location]);
    console.log(loading, data, called);
    return (
        <div className="h-screen">
            <div className="flex flex-col items-center justify-center">
            </div>
            <div></div>
            {loading && (
                <div>
                    <span>There are not podcasts yet...</span>
                </div>
            )}
        </div>
    )
}