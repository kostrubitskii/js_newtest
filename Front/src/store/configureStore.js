import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { heroesReducer } from "../reducer/heroesReducer";

const rootReducer = combineReducers({
  heroes: heroesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store 