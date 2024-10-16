import ImpactApp from "./reducers";
import { applyMiddleware, compose, createStore } from 'redux';
// import thunk from "redux-thunk";
// const middleware = [thunk];
export const store = createStore(ImpactApp

    );
      