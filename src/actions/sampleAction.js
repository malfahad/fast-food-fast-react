import actionTypes from './actionTypes';

export const sampleAction = ()=>dispatch({
    type: actionTypes.SAMPLE_ACTION,
    payload:'ACTION dispatched'
})

export default sampleAction;