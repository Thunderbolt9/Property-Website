import { createStore } from "redux";
import reducer from "./reducer";

// storing user object for maintaining session
const store = createStore(reducer);

export default store;
