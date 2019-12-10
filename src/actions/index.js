//this implementation of redux doesnt follow conventions closely but it is good enough, refer to lecture 216 stephen for more
import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";
//above is fixed strings to prevent typos in actions/reducers

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
//with getState below we can get access to redux store and from there we will pull userID to crosscheck if the user created a specific stream or not
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  //Do some programmatic navigation to get the user back to root route
  history.push("/");
};
//axios returns a response object in network tab if i want to check, response creates the entire response from api, .data shows the data

export const fetchStreams = () => {
  return async dispatch => {
    //using return here instead of ommitting it just for variation sake for later reference, doing so below too
    const response = await streams.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = id => {
  return async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};
//id is immune to PUT request sideffects(replacing existing data 100%, remember cycle analogy by angela)

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};

// can also be written as export const createStream = (formValues) => {
//   return (dispatch) => {
//
//   };
