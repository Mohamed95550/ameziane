import { FETCH_ALL_TASKS } from '../actions/types';

export default function(state = {}, action) {
 
    switch (action.type) {  
        
        case FETCH_ALL_TASKS:
            return action.payload ;
        
        default:
            return state;
    }
}