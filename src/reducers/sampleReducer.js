import actionTypes from '../actions/actionTypes';

const sampleReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SAMPLE_ACTION:
      return { ...state, data: action.payload };

    default:
      return { ...state };
  }
};

export default sampleReducer;
