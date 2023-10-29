import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducer';

const storeState = configureStore({
  reducer: rootReducer,
});

export default storeState;
