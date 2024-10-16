import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './util/redux/store'
import { Provider } from 'react-redux';
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from '@web3-react/core'
import  { Toaster } from 'react-hot-toast';


function getLibrary(provider) {
  console.log("providerprovider");
  return new Web3Provider(provider);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
       <>
     <Toaster
  position="bottom-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
 
    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
<Provider store={store} >
        {/* <Web3ReactProvider getLibrary={(getLibrary)}> */}
    <App />
    {/* </Web3ReactProvider> */}
      </Provider>
    
  {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
