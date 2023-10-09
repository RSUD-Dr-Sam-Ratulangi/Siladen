import {createStore} from 'redux';
import {rootReducer} from './reducer';

const storeState = createStore(rootReducer);

export default storeState;
