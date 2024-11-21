import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'http://localhost:5000/swagger/v1/swagger.json',
  output: {
    format: 'prettier',
    path: './src/api/auto-generated/',
  },
  plugins: [
    '@hey-api/schemas',
    '@hey-api/services',
    {
      asClass: true,
      name: '@hey-api/services',
    },
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'javascript',
      name: '@hey-api/types',
    },
  ],
});

