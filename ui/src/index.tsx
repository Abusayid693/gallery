import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { SocketProvider } from "./contexts/socket";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
      <App />
      </SocketProvider>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
