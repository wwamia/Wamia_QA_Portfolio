// before run: json-server --watch db.json

import { test, expect, request } from '@playwright/test';

test('@api GET /users returns user list', async () => {
  const api = await request.newContext({ baseURL: 'http://localhost:3000' });
  const res = await api.get('/users');
  expect(res.status()).toBe(200);
  const users = await res.json();
  expect(Array.isArray(users)).toBe(true);
  expect(users[0]).toHaveProperty('name');
});

test('@api GET /tasks returns task list', async () => {
  const api = await request.newContext({ baseURL: 'http://localhost:3000' });
  const res = await api.get('/tasks');
  expect(res.status()).toBe(200);
  const tasks = await res.json();
  expect(Array.isArray(tasks)).toBe(true);
  expect(tasks[0]).toHaveProperty('title');
});

