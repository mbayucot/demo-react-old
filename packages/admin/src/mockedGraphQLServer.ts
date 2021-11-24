import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { gql } from '@apollo/client';

import { buildClientSchema, execute } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';

import introspection from './introspection.json';

// Build a schema using the introspection
// @ts-ignore
const schema = buildClientSchema(introspection);

// Stub out our schema with fake data
const mockedSchema = addMocksToSchema({ schema });

// Set up a server that reads a GraphQL document and returns the data for it

export const req = rest.post<{ query: string; variables: any }>(
  'http://localhost:4000/graphql',
  async (req, res, ctx) => {
    const result = await execute(
      mockedSchema,
      gql`
        ${req.body.query}
      `,
      null,
      null,
      req.body.variables,
    );

    return res(ctx.json(result));
  },
);
