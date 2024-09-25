import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { BaseStyles, ThemeProvider } from '@primer/react';
import { StoreProvider } from './store/StoreProvider';
import { router } from './Routes';
import { ApiStoreProvider } from './api/api-provider';
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ApiStoreProvider>
      <StoreProvider>
        <ThemeProvider
          colorMode='day'
        >
          <BaseStyles>
            <RouterProvider router={router} />
          </BaseStyles>
        </ThemeProvider>
      </StoreProvider>
    </ApiStoreProvider>

  </StrictMode>,
);
