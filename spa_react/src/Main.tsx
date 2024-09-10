import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { BaseStyles, ThemeProvider } from '@primer/react';
import { StoreProvider } from './store/StoreProvider';
import { router } from './Routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <StoreProvider>
      <ThemeProvider
        colorMode='day'
      >
        <BaseStyles>
          <RouterProvider router={router} />
        </BaseStyles>
      </ThemeProvider>
    </StoreProvider>

  </StrictMode>,
);
