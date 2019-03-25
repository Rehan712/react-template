import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    test:(state)=>({...state})
});


export default rootReducers;