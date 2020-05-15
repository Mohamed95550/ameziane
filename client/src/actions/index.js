import axios from 'axios';
import  { 
         FETCH_USER,
         FETCH_ALL_TASKS,
         FETCH_PROXIES_BY_USER,
         FETCH_ACCOUNTS_BY_USER 
        } from './types';

export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({ 
                type: FETCH_USER,
                 payload: res.data
        });
};

//Tasks Reducers
export const fetchAllTasks = () => async dispatch => {
        
        const res = await  axios.get('/api/tasks');
        dispatch({ 
                type: FETCH_ALL_TASKS, 
                payload: res.data
        });
};

export const fetchProxiesByUser = () => async dispatch => {
        
        const res = await axios.get('/api/proxies');
        dispatch({
                type: FETCH_PROXIES_BY_USER,
                payload: res.data
        })
};

export const fetchAccountsByUser = () => async dispatch => {
        
        const res = await axios.get('/api/accounts');
        dispatch({
                type: FETCH_ACCOUNTS_BY_USER,
                payload: res.data
        })
};