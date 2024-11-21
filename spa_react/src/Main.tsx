import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { BaseStyles, ThemeProvider } from '@primer/react';
import { StoreProvider } from './store/StoreProvider';
import { router } from './Routes';
import { ApiProvider } from './api/api-store/ApiStoreProvider';
import { client } from './api/auto-generated';
import { API_BASE_URL } from './shared/constant';

client.setConfig({
  baseUrl: API_BASE_URL,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ApiProvider>
      <StoreProvider>
        <ThemeProvider
          colorMode='day'
        >
          <BaseStyles>
            <RouterProvider router={router} />
          </BaseStyles>
        </ThemeProvider>
      </StoreProvider>
    </ApiProvider>

  </StrictMode>,
);
