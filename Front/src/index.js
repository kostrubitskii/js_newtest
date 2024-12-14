import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";
import { Root } from "./root";
import store from './store/configureStore';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
        <Root />
      </Provider>
);
