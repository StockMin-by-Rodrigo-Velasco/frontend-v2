import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router';

import './index.css';

import RoutesMain from './routes/RoutesMain.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store } >
      <BrowserRouter>
        <RoutesMain/>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
