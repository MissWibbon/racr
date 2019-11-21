import React, { useContext, useEffect, useState } from 'react'
import ChallengeForm from './challengeForm'
import { RaceContext } from './appstate'
import API from '../utils/API'
import io from 'socket.io-client';
import NotifyCard from './notifycard';

const ChallengeResponse = (props) => {
    const { match } = props;
    const context = useContext(RaceContext);
    const { id } = match.params
    const {isLoading, notifications } = context
   

    return (

        <div id="challengeModal">
            {isLoading
                ? (
                    notifications
                        ? (
                            notifications.map( post =>
                            
                            (
                                <NotifyCard {...props} data ={post}></NotifyCard>
                            )    
                            )

                        )
                        : <h3>no new notifications</h3>
                ) :
                <h2>Loading...</h2>
            }
        </div>
    )
}


export default ChallengeResponse