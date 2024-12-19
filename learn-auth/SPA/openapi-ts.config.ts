import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'http://localhost:5136/swagger/v1/swagger.json',
  output: {
    format: 'prettier',
    path: './src/api/generated/',
  },
  plugins: [
    ...defaultPlugins,
    {
      name: '@hey-api/typescript'
    },
    {
      name: '@hey-api/transformers'
    },
    {
      asClass: true,
      name: '@hey-api/sdk'
    }
  ],
});
