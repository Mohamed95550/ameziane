import { FETCH_PROXIES_BY_USER } from '../actions/types';

export default function(state = {}, action) {
 
    switch (action.type) {  
        
        case FETCH_PROXIES_BY_USER:
            return action.payload ;
        
        default:
            return state;
    }
}