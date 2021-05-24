import { constants } from '../actions/markers';

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type){
    case constants.get('CREATE_MARKER'):
      const newMarker = {...action.payload}
      return [...state, newMarker];
    case constants.get('GET_MARKERS_DONE') :
      return action.payload;
  }
  return [...state];
}
