const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
});

db.serialize(() => {
  // Drop tables if they exist
  db.run('DROP TABLE IF EXISTS users');
  db.run('DROP TABLE IF EXISTS posts');

  // Create users table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      name TEXT
    )
  `);

  // Create posts table
  db.run(`
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Insert X number of users
  const insertUser = db.prepare('INSERT INTO users (email, name) VALUES (?, ?)');
  for (let i = 1; i <= 10; i++) {
    insertUser.run(`user${i}@example.com`, `User ${i}`);
  }
  insertUser.finalize();

  // Insert posts
  const insertPost = db.prepare('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)');
  insertPost.run('Post by User 1', 'Post content here', 1);
  insertPost.run('Another post by User 3', 'More content here', 3);
  insertPost.finalize();

  // Print inserted users
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return console.error('Failed to query users:', err);
    console.log('Inserted users:', rows);
    db.close();
  });
});
