// before run: json-server --watch db.json

import { test, expect, request } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('@api Users API', () => {
  test('GET /users returns user list', async () => {
    const api = await request.newContext({ baseURL });
    const res = await api.get('/users');
    expect(res.status()).toBe(200);

    const users = await res.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  test('GET /users/:id returns specific user', async () => {
    const api = await request.newContext({ baseURL });
    const res = await api.get('/users/1');
    expect(res.status()).toBe(200);

    const user = await res.json();
    expect(user).toMatchObject({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com'
    });
  });
});

test.describe('@api Tasks API', () => {
  test('GET /tasks returns task list', async () => {
    const api = await request.newContext({ baseURL });
    const res = await api.get('/tasks');
    expect(res.status()).toBe(200);

    const tasks = await res.json();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks[0]).toHaveProperty('title');
  });

  test('GET /tasks/:id returns specific task', async () => {
    const api = await request.newContext({ baseURL });
    const res = await api.get('/tasks/1');
    expect(res.status()).toBe(200);

    const task = await res.json();
    expect(task).toMatchObject({
      id: 1,
      title: 'Finish report',
      completed: false,
      userId: 1
    });
  });

  const taskData = [
    { id: 1, title: 'Finish report', completed: false, userId: 1 },
    { id: 2, title: 'Fix bugs', completed: true, userId: 2 }
  ];

  for (const task of taskData) {
    test(`GET /tasks/${task.id} returns correct data`, async () => {
      const api = await request.newContext({ baseURL });
      const res = await api.get(`/tasks/${task.id}`);
      expect(res.status()).toBe(200);

      const data = await res.json();
      expect(data).toMatchObject(task);
    });
  }
});

test.describe('@api Settings API', () => {
  test('GET /settings returns configuration', async () => {
    const api = await request.newContext({ baseURL });
    const res = await api.get('/settings');
    expect(res.status()).toBe(200);

    const settings = await res.json();
    expect(settings).toHaveProperty('theme');
    expect(['dark', 'light']).toContain(settings.theme);
    expect(typeof settings.notifications).toBe('boolean');
  });
});
