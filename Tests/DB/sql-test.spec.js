const sqlite3 = require('sqlite3').verbose();
const { test, expect } = require('@playwright/test');

// Test case to verify the total number of users in the database
test('Verify user count from SQL query', async () => {
  const db = new sqlite3.Database('test.db');

  await new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
      if (err) {
        return reject(err);
      }

      const count = row.count;
      expect(count).toBe(10); 
      resolve();
    });
  });

  db.close();
});

// Test case to check if a specific user with email 'user3@example.com' exists
test('Check if specific email exists', async () => {
  const db = new sqlite3.Database('test.db');

  await new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, ['user3@example.com'], (err, row) => {
      if (err) {
        return reject(err);
      }

      expect(row).toBeTruthy();
      expect(row.name).toBe('User 3');
      resolve();
    });
  });

  db.close();
});

// Test case to verify that posts are correctly linked to users by user_id foreign key
test('Verify posts are linked to users', async () => {
  const db = new sqlite3.Database('test.db');

  await new Promise((resolve, reject) => {
    db.all(
      `SELECT users.email, posts.title 
       FROM users JOIN posts ON users.id = posts.user_id
       WHERE users.email = ?`,
      ['user1@example.com'],  // Parameterized query value for emails
      (err, rows) => {
        if (err) {
          return reject(err);
        }

        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0].email).toBe('user1@example.com');
        expect(rows[0].title).toContain('Post');
        resolve();
      }
    );
  });

  db.close();
});

//run: npm run test:with-db