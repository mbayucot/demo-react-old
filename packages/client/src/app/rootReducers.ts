import authentication from '../features/authentication/authenticationSlice';

//Include all the reducer to combine and provide to configure store.

const rootReducer = {
  authentication,
};

export default rootReducer;
