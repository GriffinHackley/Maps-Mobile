import {createStore, combineReducers, applyMiddleware} from 'redux';
import markers from '../reducers/markers';
import storage from '../middleware/storage';

export default createStore(
  combineReducers({
    markers,
  }),
  applyMiddleware(
    storage,
  )
)
