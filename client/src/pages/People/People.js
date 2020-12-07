import React from 'react';
import { GET_USERS } from '../../graphql/user';
import PeopleCard from './PeopleCard';
import { useQuery } from '@apollo/client';
import { useStore } from '../../store';

const People = () => {
    const [{auth}] = useStore();

    const { data, loading } = useQuery(GET_USERS,{
        variables: {
            userId: auth.user.id,
            skip: 0,
            limit: 10 //TODO: create a limit constant
        }
    });

    console.log('GET users', data)
    return(
        <>
        { !loading &&
            data.getUsers.map(u => (
                <PeopleCard />
            ))
        }
        </>
    )
}

export default People;