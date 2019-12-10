import _ from "lodash";

import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    ///mapkeys returns a big object with the newly made objects in it, with dotdotdot(Spread operator) we remove all the objects out individually
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    //above is equivalent to writing state[action.payload.id] = action.payload on a diff line, object based approach is used in this reducer instead of array cause less code is required for object based, array would need .map
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
//ask ceenik about the necessity of state here in fetchstreams and fetch_stream's use
//this related question in streamCreate
//ask ceenikc why authreducer needs default values in its object
