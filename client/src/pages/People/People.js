import React from 'react';
import { GET_USERS } from '../../graphql/user';
import PeopleCard from './PeopleCard';
import { useQuery } from '@apollo/client';
import { useStore } from '../../store';

const People = () => {
    const [{auth}] = useStore();

    const { data, loading, networkStatus } = useQuery(GET_USERS,{
        variables: {
            userId: auth.user.id,
            skip: 0,
            limit: 10 //TODO: create a limit constant
        },
        notifyOnNetworkStatusChange: true
    });

    const content = () => {
       if(loading && networkStatus === 1){
           return(
               <h5> loading ... </h5>
           )
       }

       const { users, count } = data.getUsers;
       if(!users.length > 0){
           return(
               <h4> No users yet... </h4>
           )
       }

       return(
           users.map((user, index) => {
               return <PeopleCard key={index} />
           })
       )

    }

    return(
        <>
        {content()}
        </>
    )
}

export default People;