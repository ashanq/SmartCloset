import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </StrictMode>,
  document.getElementById('root')
);
