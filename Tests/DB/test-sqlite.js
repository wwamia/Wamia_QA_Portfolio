const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db');

db.serialize(() => {
  db.run("CREATE TABLE test (id INT, name TEXT)");
  db.run("INSERT INTO test (id, name) VALUES (?, ?)", [1, 'Alice']);

  db.get("SELECT * FROM test WHERE id = 1", (err, row) => {
    if (err) {
      console.error("Query error:", err);
    } else {
      console.log("Retrieved row:", row);
    }

    db.close();
  });
});
