import { FETCH_USER, FETCH_ALL_USERS } from '../actions/types';

export default function(state = {}, action) {
    //console.log(action," __ ",action.payload);
    switch (action.type) {
       
        case FETCH_USER:
            return action.payload || false;
        
        default:
            return state;
    }
}