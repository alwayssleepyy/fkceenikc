import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
//above is syntax to rename it to make it make discernable
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});
