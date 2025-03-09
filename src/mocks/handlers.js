import { rest } from 'msw';

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const { username, password } = req.body;

    if (username === 'testuser' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-jwt-token',
          user: { id: 1, username: 'testuser', role: 'user' }
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  }),

  rest.get('/api/documents', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        documents: [
          { id: 1, title: 'Test Document', status: 'published', version: '1.0' }
        ]
      })
    );
  })
];