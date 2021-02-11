import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { me } from '../__generated__/me';

const USE_ME = gql`
    query me{
        me{
            id
            name
            email
            role
        }
    }
`;

export const useMe = () => {
    return useQuery<me>(USE_ME);
}
