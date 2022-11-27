import { useReducer } from 'react';

interface actionTypes{
    type:string;
};

interface stateTypes{

};

export const reducer = (state:stateTypes, action:actionTypes) =>{
    switch(action.type){
        default: return state;
    }
};

export function useStateReducer(initialState:object){
    return useReducer(reducer, initialState)
};