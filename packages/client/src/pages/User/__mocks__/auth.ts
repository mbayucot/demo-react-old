import { rest } from 'msw';

interface User {
  id: number;
  email: string;
}

const data = {
  id: 1,
  email: 'test@test.com',
} as User;

const token = '__test_token__';

const handlers = [
  rest.post(`http://localhost:4000/signup`, (req, res, ctx) => {
    const { user } = req.body as {
      user: User;
    };
    if (user.email === 'invalid@email.com') {
      return res(ctx.status(422), ctx.json({ email: '__test_error_description__' }));
    }

    return res(ctx.status(200), ctx.set('authorization', token), ctx.json(data));
  }),
  rest.post(`http://localhost:4000/login`, (req, res, ctx) => {
    const { user } = req.body as {
      user: User;
    };
    if (user.email === 'invalid@email.com') {
      return res(ctx.status(422), ctx.json({ email: '__test_error_description__' }));
    }

    return res(ctx.status(200), ctx.set('authorization', token), ctx.json(data));
  }),
  rest.delete(`http://localhost:4000/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export { handlers, data };
