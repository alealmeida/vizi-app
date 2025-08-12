/// <reference types="node" />
// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.EXPO_PUBLIC_API_GRAPHQL || 'http://localhost:1337/graphql',
  documents: 'src/graphql/documents/**/*.graphql',
  generates: {
    'src/graphql/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: false,
        maybeValue: 'T | null',
        scalars: {
          DateTime: 'string',
          Decimal: 'number',
          JSON: 'any'
        }
      }
    }
  }
};

export default config;